import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createProposalScaffold, Proposal } from "@/lib/proposal/schema";
import { seedProposals } from "@/lib/proposal/data";
import { listProposals, saveProposal, toSummary } from "@/lib/proposal/store";

export const dynamic = "force-dynamic";

/** GET /api/proposals — summaries, stored first then non-shadowed seeds. */
export async function GET() {
  const stored = await listProposals();
  const storedIds = new Set(stored.map((p) => p.id));
  const seeds = seedProposals
    .filter((p) => !storedIds.has(p.id))
    .map((p) => toSummary(p, true));
  return NextResponse.json({ proposals: [...stored, ...seeds] });
}

/**
 * POST /api/proposals — create.
 * Body: {} | { clientName?, eventTitle? } → blank scaffold
 *       { proposal: {...} }               → import a full document (dev-mode JSON door)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    let proposal;
    if (body?.proposal) {
      const now = new Date().toISOString();
      const scaffold = createProposalScaffold();
      proposal = Proposal.parse({
        // server-controlled identity/timestamps unless explicitly provided
        id: body.proposal.id ?? scaffold.id,
        slug: body.proposal.slug ?? scaffold.slug,
        createdAt: body.proposal.createdAt ?? now,
        updatedAt: now,
        ...body.proposal,
      });
    } else {
      proposal = createProposalScaffold(body);
    }
    const saved = await saveProposal(proposal);
    return NextResponse.json({ proposal: saved }, { status: 201 });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid proposal document", issues: err.issues },
        { status: 400 }
      );
    }
    console.error("POST /api/proposals failed:", err);
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 });
  }
}
