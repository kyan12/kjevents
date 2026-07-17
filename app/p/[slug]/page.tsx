import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProposalView from "@/components/proposal/ProposalView";
import { getProposalBySlug } from "@/lib/proposal/data";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ static?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) return { title: "Proposal" };
  return {
    title: `${proposal.client.name} — ${proposal.event.title}`,
    description: `Event proposal prepared by Kira Jia Events.`,
    robots: { index: false, follow: false },
  };
}

export default async function ProposalPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const proposal = await getProposalBySlug(slug);
  if (!proposal) notFound();
  return <ProposalView proposal={proposal} staticRender={sp.static === "1"} fullPage />;
}
