import type { TProposal } from "./schema";
import { edwinTangProposal } from "./seed-edwin";
import { marcusProposal } from "./seed-marcus";
import { felicityProposal } from "./seed-felicity";
import { meridianProposal } from "./seed-meridian";
import { lunarProposal } from "./seed-lunar";
import { getProposal, getProposalBySlugFromStore } from "./store";

/**
 * Read-side lookup for proposals. The persistent store (Vercel Blob / local
 * fs) is checked first; built-in seeds (demo/reference fixtures) act as a
 * fallback and can be shadowed by saving an edited copy under the same id.
 */
export const seedProposals: TProposal[] = [
  edwinTangProposal,
  marcusProposal,
  felicityProposal,
  meridianProposal,
  lunarProposal,
];

export async function getProposalBySlug(slug: string): Promise<TProposal | null> {
  const stored = await getProposalBySlugFromStore(slug);
  if (stored) return stored;
  return seedProposals.find((p) => p.slug === slug) ?? null;
}

export async function getProposalById(id: string): Promise<TProposal | null> {
  const stored = await getProposal(id);
  if (stored) return stored;
  return seedProposals.find((p) => p.id === id) ?? null;
}
