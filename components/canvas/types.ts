import type { TProposal } from "@/lib/proposal/schema";

/** Selection model per canvas-spec §3. */
export type Selection =
  | { kind: "section"; sectionId: string }
  | { kind: "item"; sectionId: string; path: string }
  | { kind: "imageSlot"; sectionId: string; slot: string }
  | null;

/** Amber assumption chip (op "assume") — persisted until accepted or corrected. */
export type Chip = { id: string; sectionId: string; field: string; text: string };

/** Question card (op "ask") — non-blocking, at most one per turn. */
export type Question = { id: string; sectionId: string; text: string; choices?: string[] };

/** One history-drawer entry = one turn (prompt, inline edit, or system event). */
export type TurnEntry = {
  n: number;
  instruction: string;
  notes: string[];
  touched: string[];
  summary?: string;
  error?: string;
  /** true for app-generated entries (inline edits, imports, publishes) */
  system?: boolean;
  ts: string;
};

export type SaveState = "idle" | "saving" | "saved" | "error";

export type CommandDef = { name: string; desc: string };

export type CanvasDoc = TProposal;
