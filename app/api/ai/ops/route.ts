import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { Proposal, type TProposal } from "@/lib/proposal/schema";
import { OpSchema, opTargetSection } from "@/lib/proposal/ops";
import { OPS_SYSTEM_PROMPT } from "@/lib/ai/ops-prompt";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * POST /api/ai/ops — the canvas's model endpoint.
 * Body: { instruction: string, proposal: TProposal, selection?: Selection, turn?: number }
 * Response: application/x-ndjson — one validated op per line, flushed as generated.
 *
 * Server responsibilities (spec §4.2/§3): zod-validate every line (invalid ops are
 * dropped, never forwarded) and enforce selection write-scope — mutating ops that
 * target sections outside the selection are dropped as scope violations unless the
 * model has escaped with scope:"document" on an earlier (or the same) op.
 */

type Selection =
  | { kind: "section"; sectionId: string }
  | { kind: "item"; sectionId: string; path: string }
  | { kind: "imageSlot"; sectionId: string; slot: string }
  | null;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      {
        error:
          "AI editing is not configured yet — add ANTHROPIC_API_KEY to .env.local and restart the dev server.",
      },
      { status: 503 }
    );
  }

  let instruction: string;
  let proposal: TProposal;
  let selection: Selection = null;
  try {
    const body = await req.json();
    instruction = String(body?.instruction ?? "").trim();
    proposal = Proposal.parse(body?.proposal);
    selection = body?.selection ?? null;
    if (!instruction) throw new Error("empty instruction");
  } catch {
    return NextResponse.json(
      { error: "Provide an instruction and a valid proposal document." },
      { status: 400 }
    );
  }

  const userContent = [
    `Current proposal document:\n${JSON.stringify({
      client: proposal.client,
      event: proposal.event,
      confidential: proposal.confidential,
      theme: proposal.theme,
      sections: proposal.sections,
    })}`,
    selection
      ? `Active selection (write scope): ${JSON.stringify(selection)}`
      : "No selection — document-wide write scope.",
    `Instruction:\n${instruction}`,
  ].join("\n\n");

  const client = new Anthropic();
  const encoder = new TextEncoder();
  const scopeSection = selection?.sectionId ?? null;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) =>
        controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));

      let buffer = "";
      let docScope = scopeSection == null;
      let doneSent = false;

      const handleLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        let parsed: unknown;
        try {
          parsed = JSON.parse(trimmed);
        } catch {
          console.warn("[ops] dropped malformed line:", trimmed.slice(0, 200));
          return;
        }
        const op = OpSchema.safeParse(parsed);
        if (!op.success) {
          console.warn("[ops] dropped invalid op:", trimmed.slice(0, 200));
          return;
        }
        if ("scope" in op.data && op.data.scope === "document") docScope = true;
        const target = opTargetSection(op.data);
        if (!docScope && target && target !== scopeSection) {
          console.warn(`[ops] scope_violation: ${op.data.op} → ${target} (selection ${scopeSection})`);
          return;
        }
        if (op.data.op === "done") doneSent = true;
        send(op.data);
      };

      try {
        const msgStream = client.messages.stream({
          model: "claude-opus-4-8",
          max_tokens: 32000,
          thinking: { type: "adaptive" },
          system: [
            {
              type: "text",
              text: OPS_SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [{ role: "user", content: userContent }],
        });

        msgStream.on("text", (delta) => {
          buffer += delta;
          let nl: number;
          while ((nl = buffer.indexOf("\n")) >= 0) {
            const line = buffer.slice(0, nl);
            buffer = buffer.slice(nl + 1);
            handleLine(line);
          }
        });

        await msgStream.finalMessage();
        if (buffer.trim()) handleLine(buffer);
        if (!doneSent) send({ op: "done", summary: "Turn complete." });
      } catch (err) {
        console.error("[ops] stream failed:", err);
        send({
          op: "error",
          message: err instanceof Error ? err.message : "The model stream failed.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
