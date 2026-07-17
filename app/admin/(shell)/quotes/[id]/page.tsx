import { notFound } from "next/navigation";
import QuoteEditor from "@/components/admin/QuoteEditor";
import { getProposalById } from "@/lib/proposal/data";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function QuoteEditorPage({ params }: Props) {
  const { id } = await params;
  const proposal = await getProposalById(id);
  if (!proposal) notFound();
  return <QuoteEditor initial={proposal} />;
}
