import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ZodError } from "zod";
import {
  Proposal,
  createProposalScaffold,
  newSectionId,
  makeSlug,
  type TProposal,
} from "@/lib/proposal/schema";
import { proposalDraftJsonSchema } from "@/lib/ai/output-schema";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // drafting a full proposal can take a while

/**
 * POST /api/ai/parse
 * Body: { brief: string, proposal?: TProposal }
 *  - brief only            → generate a fresh proposal from the description
 *  - brief + proposal      → refine: apply the instruction to the document
 * Returns { proposal } — a complete, validated Proposal.
 */
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "AI drafting is not configured yet — add ANTHROPIC_API_KEY to .env.local (get one at console.anthropic.com) and restart the dev server. Until then, use Import JSON.",
      },
      { status: 503 }
    );
  }

  let brief: string;
  let existing: TProposal | undefined;
  try {
    const body = await req.json();
    brief = String(body?.brief ?? "").trim();
    existing = body?.proposal ? Proposal.parse(body.proposal) : undefined;
    if (!brief) throw new Error("empty brief");
  } catch {
    return NextResponse.json(
      { error: "Provide a brief (and optionally a valid current proposal)." },
      { status: 400 }
    );
  }

  const userContent = existing
    ? `Current proposal document:\n${JSON.stringify({
        client: existing.client,
        event: existing.event,
        confidential: existing.confidential,
        sections: existing.sections,
      })}\n\nInstruction:\n${brief}`
    : `Brief:\n${brief}`;

  try {
    const client = new Anthropic();
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 32000,
      thinking: { type: "adaptive" },
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      output_config: {
        format: {
          type: "json_schema",
          schema: proposalDraftJsonSchema,
        },
      },
      messages: [{ role: "user", content: userContent }],
    });
    const response = await stream.finalMessage();

    if (response.stop_reason === "refusal") {
      return NextResponse.json(
        { error: "The model declined this request. Rephrase the brief and try again." },
        { status: 422 }
      );
    }
    if (response.stop_reason === "max_tokens") {
      return NextResponse.json(
        { error: "The draft ran too long and was cut off. Try a tighter brief." },
        { status: 422 }
      );
    }

    const text = response.content.find((b) => b.type === "text")?.text ?? "";
    const draft = JSON.parse(text);

    // normalize: fresh section ids, tolerant hex cleanup
    for (const section of draft.sections ?? []) {
      section.id = newSectionId();
      if (section.type === "palette") {
        for (const opt of section.options ?? []) {
          opt.colors = (opt.colors ?? [])
            .map((c: { name?: string; hex?: string }) => ({
              name: c.name ?? "",
              hex: normalizeHex(c.hex),
            }))
            .filter((c: { hex: string | null }) => c.hex !== null);
          opt.gallery = opt.gallery ?? [];
        }
      }
    }

    // identity: keep the existing document's, or mint a fresh one
    const now = new Date().toISOString();
    const scaffold = existing ?? createProposalScaffold({ clientName: draft.client?.name });
    const proposal = Proposal.parse({
      id: scaffold.id,
      slug: existing ? existing.slug : makeSlug(draft.client?.name ?? "proposal"),
      status: scaffold.status,
      createdAt: existing ? existing.createdAt : now,
      updatedAt: now,
      client: draft.client,
      event: draft.event,
      confidential: draft.confidential ?? true,
      sections: draft.sections,
    });

    return NextResponse.json({ proposal });
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Anthropic API key is invalid — check ANTHROPIC_API_KEY." },
        { status: 503 }
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Rate limited by the Anthropic API — wait a moment and retry." },
        { status: 429 }
      );
    }
    if (err instanceof Anthropic.APIConnectionError) {
      return NextResponse.json(
        { error: "Could not reach the Anthropic API — check your connection." },
        { status: 502 }
      );
    }
    if (err instanceof Anthropic.APIError) {
      console.error("AI parse API error:", err.status, err.message);
      return NextResponse.json(
        { error: `Anthropic API error (${err.status}): ${err.message}` },
        { status: 502 }
      );
    }
    if (err instanceof ZodError) {
      console.error("AI parse validation issues:", err.issues);
      return NextResponse.json(
        { error: "The draft came back malformed — try again or tweak the brief." },
        { status: 422 }
      );
    }
    console.error("AI parse failed:", err);
    return NextResponse.json({ error: "Drafting failed unexpectedly." }, { status: 500 });
  }
}

function normalizeHex(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  let h = raw.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return /^[0-9a-fA-F]{6}$/.test(h) ? `#${h}` : null;
}
