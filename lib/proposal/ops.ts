import { z } from "zod";
import {
  Proposal,
  Section,
  ThemeTokens,
  ThemeStyle,
  newSectionId,
  computeOptionTotal,
  type TProposal,
  type TSection,
} from "./schema";

/**
 * Operation protocol for the canvas builder — the wire vocabulary streamed by
 * /api/ai/ops and the pure reducer that applies ops to a document. See
 * docs/builder/canvas-spec.md §4. Everything here is side-effect free and
 * shared by server (validation + scope enforcement) and client (application).
 */

/* -------------------------------- vocabulary -------------------------------- */

/** A section as the model writes it — id optional (minted on add, matched on replace). */
export const SectionDraft = z.looseObject({ type: z.string() });

export const ImageryRequest = z.object({
  styleRef: z.string(),
  model: z.string(),
  aspect: z.string(),
  prompt: z.string(),
  negatives: z.array(z.string()).default([]),
  alt: z.string(),
  reference: z
    .object({ url: z.string(), kind: z.enum(["venue-photo", "style"]) })
    .optional(),
});
export type TImageryRequest = z.infer<typeof ImageryRequest>;

const scopeField = { scope: z.enum(["document"]).optional() };

export const OpSchema = z.discriminatedUnion("op", [
  z.object({
    op: z.literal("setMeta"),
    patch: z.object({
      client: z.object({ name: z.string().optional(), email: z.string().optional() }).optional(),
      event: z
        .object({
          title: z.string().optional(),
          type: z.string().optional(),
          date: z.string().optional(),
          time: z.string().optional(),
          location: z.string().optional(),
          guests: z.string().optional(),
        })
        .optional(),
      confidential: z.boolean().optional(),
    }),
    ...scopeField,
  }),
  z.object({
    op: z.literal("setTheme"),
    theme: z.object({ style: ThemeStyle, tokens: ThemeTokens.partial().optional() }),
    ...scopeField,
  }),
  z.object({
    op: z.literal("add"),
    after: z.string().optional(),
    before: z.string().optional(),
    section: SectionDraft,
    ...scopeField,
  }),
  z.object({ op: z.literal("replace"), id: z.string(), section: SectionDraft, ...scopeField }),
  z.object({ op: z.literal("remove"), id: z.string(), ...scopeField }),
  z.object({
    op: z.literal("move"),
    id: z.string(),
    after: z.string().optional(),
    before: z.string().optional(),
    ...scopeField,
  }),
  z.object({
    op: z.literal("setImagery"),
    id: z.string(),
    slot: z.string(),
    request: ImageryRequest,
    ...scopeField,
  }),
  z.object({
    op: z.literal("ask"),
    id: z.string(),
    text: z.string(),
    choices: z.array(z.string()).optional(),
    ...scopeField,
  }),
  z.object({
    op: z.literal("assume"),
    id: z.string(),
    field: z.string(),
    text: z.string(),
    ...scopeField,
  }),
  z.object({ op: z.literal("note"), text: z.string(), ...scopeField }),
  z.object({ op: z.literal("done"), summary: z.string(), ...scopeField }),
  z.object({ op: z.literal("error"), message: z.string() }),
]);
export type TOp = z.infer<typeof OpSchema>;

/** Ops that mutate a specific section — subject to selection write-scope. */
export function opTargetSection(op: TOp): string | null {
  switch (op.op) {
    case "replace":
    case "remove":
    case "move":
    case "setImagery":
      return op.id;
    default:
      return null;
  }
}

/* --------------------------------- reducer ---------------------------------- */

export type ApplyResult = {
  doc: TProposal;
  /** section ids whose render should flash as changed */
  touched: string[];
  error?: string;
};

function parseSectionWithId(draft: unknown, id: string): TSection {
  return Section.parse({ ...(draft as Record<string, unknown>), id });
}

/**
 * Apply one op to a document. Never throws — invalid ops return the document
 * unchanged with `error` set (the canvas logs, the stream continues).
 */
export function applyOp(doc: TProposal, op: TOp): ApplyResult {
  const unchanged = (error?: string): ApplyResult => ({ doc, touched: [], error });
  try {
    switch (op.op) {
      case "setMeta": {
        const next: TProposal = {
          ...doc,
          client: { ...doc.client, ...(op.patch.client ?? {}) },
          event: { ...doc.event, ...(op.patch.event ?? {}) } as TProposal["event"],
          confidential: op.patch.confidential ?? doc.confidential,
        };
        return { doc: Proposal.parse(next), touched: [] };
      }
      case "setTheme": {
        const next: TProposal = {
          ...doc,
          theme: { style: op.theme.style, tokens: { ...(doc.theme?.tokens ?? {}), ...(op.theme.tokens ?? {}) } },
        };
        return { doc: Proposal.parse(next), touched: [] };
      }
      case "add": {
        const section = parseSectionWithId(op.section, newSectionId());
        const sections = [...doc.sections];
        let idx = -1;
        if (op.after) idx = sections.findIndex((s) => s.id === op.after) + 1 || -1;
        else if (op.before) idx = sections.findIndex((s) => s.id === op.before);
        if (idx < 0) {
          // default anchor: before the closing section, else append
          const closing = sections.findIndex((s) => s.type === "closing");
          idx = closing >= 0 ? closing : sections.length;
        }
        sections.splice(idx, 0, section);
        return { doc: { ...doc, sections }, touched: [section.id] };
      }
      case "replace": {
        const idx = doc.sections.findIndex((s) => s.id === op.id);
        if (idx < 0) return unchanged(`replace: no section ${op.id}`);
        const section = parseSectionWithId(op.section, op.id);
        if (section.type !== doc.sections[idx].type) {
          // type changes are allowed but worth flagging in dev tools
        }
        const sections = [...doc.sections];
        sections[idx] = section;
        return { doc: { ...doc, sections }, touched: [op.id] };
      }
      case "remove": {
        const idx = doc.sections.findIndex((s) => s.id === op.id);
        if (idx < 0) return unchanged(`remove: no section ${op.id}`);
        const sections = doc.sections.filter((s) => s.id !== op.id);
        return { doc: { ...doc, sections }, touched: [] };
      }
      case "move": {
        const from = doc.sections.findIndex((s) => s.id === op.id);
        if (from < 0) return unchanged(`move: no section ${op.id}`);
        const sections = [...doc.sections];
        const [sec] = sections.splice(from, 1);
        let idx = -1;
        if (op.after) idx = sections.findIndex((s) => s.id === op.after) + 1 || -1;
        else if (op.before) idx = sections.findIndex((s) => s.id === op.before);
        if (idx < 0) idx = sections.length;
        sections.splice(idx, 0, sec);
        return { doc: { ...doc, sections }, touched: [op.id] };
      }
      // ops with no document effect (handled by the canvas / imagery pipeline)
      case "setImagery":
      case "ask":
      case "assume":
      case "note":
      case "done":
      case "error":
        return { doc, touched: op.op === "setImagery" ? [op.id] : [] };
    }
  } catch (err) {
    return unchanged(err instanceof Error ? err.message : String(err));
  }
}

/* ------------------------------ inline-edit path ----------------------------- */

/**
 * Immutable deep-set along a dot path ("items.2.title"). Numeric segments
 * index arrays. Used to commit contentEditable edits as a local replace.
 */
export function setIn<T>(obj: T, path: string, value: unknown): T {
  const segs = path.split(".");
  const step = (node: unknown, i: number): unknown => {
    if (i === segs.length) return value;
    const key = segs[i];
    if (Array.isArray(node)) {
      const idx = Number(key);
      const copy = node.slice();
      copy[idx] = step(node[idx], i + 1);
      return copy;
    }
    const rec = (node ?? {}) as Record<string, unknown>;
    return { ...rec, [key]: step(rec[key], i + 1) };
  };
  return step(obj, 0) as T;
}

/** Read along a dot path — mirror of setIn. */
export function getIn(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((node, key) => {
    if (node == null) return undefined;
    if (Array.isArray(node)) return node[Number(key)];
    return (node as Record<string, unknown>)[key];
  }, obj);
}

/* ----------------------------- totals verification --------------------------- */

/**
 * Client-side math check per spec §4.3: displayed totals must equal the sum
 * of line items. Returns option names whose stated total mismatches.
 */
export function verifyInvestmentTotals(section: TSection): string[] {
  if (section.type !== "investment") return [];
  const bad: string[] = [];
  for (const option of section.options) {
    if (!option.total) continue;
    const sum = computeOptionTotal(option);
    const statedMax = option.total.max ?? option.total.min;
    const sumMax = sum.max ?? sum.min;
    if (option.total.min !== sum.min || statedMax !== sumMax) bad.push(option.name);
  }
  return bad;
}
