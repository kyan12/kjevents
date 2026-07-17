import { notFound } from "next/navigation";
import CanvasApp from "@/components/canvas/CanvasApp";
import { getProposalById } from "@/lib/proposal/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

/** The canvas builder — full-viewport workspace layered over the admin shell. */
export default async function CanvasPage({ params }: Props) {
  const { id } = await params;
  const proposal = await getProposalById(id);
  if (!proposal) notFound();
  return <CanvasApp initial={proposal} />;
}
