import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Proposal } from "@/lib/proposal/schema";
import { getProposalById, seedProposals } from "@/lib/proposal/data";
import { deleteProposal, saveProposal } from "@/lib/proposal/store";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  const proposal = await getProposalById(id);
  if (!proposal) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ proposal });
}

/** PUT /api/proposals/[id] — full-document update (validated). */
export async function PUT(req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const doc = body?.proposal ?? body;
    if (doc?.id && doc.id !== id) {
      return NextResponse.json({ error: "Document id does not match URL" }, { status: 400 });
    }
    const proposal = Proposal.parse({ ...doc, id });
    const saved = await saveProposal(proposal);
    return NextResponse.json({ proposal: saved });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid proposal document", issues: err.issues },
        { status: 400 }
      );
    }
    console.error(`PUT /api/proposals/${id} failed:`, err);
    return NextResponse.json({ error: "Failed to save proposal" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  if (seedProposals.some((p) => p.id === id)) {
    const removedShadow = await deleteProposal(id);
    return NextResponse.json({
      ok: true,
      note: removedShadow
        ? "Removed your edited copy; the built-in demo remains."
        : "Built-in demo proposals cannot be deleted.",
    });
  }
  const ok = await deleteProposal(id);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
