import { promises as fs } from "fs";
import path from "path";
import { list, put } from "@vercel/blob";
import { Proposal, type TProposal } from "./schema";

/**
 * Proposal persistence.
 *
 * The whole collection lives in ONE small JSON document ("db"): proposals are
 * a few KB each and there is a single admin editing them, so a single-document
 * store is simpler and plenty fast at this scale. Images are NOT stored here —
 * they are separate public blobs / files.
 *
 * Backends:
 *  - Vercel Blob  (production; picked when BLOB_READ_WRITE_TOKEN is set)
 *  - local fs     (.data/proposals-db.json; dev fallback)
 *
 * Concurrency: last-write-wins on the whole document. Fine for a single
 * admin; revisit if this ever becomes multi-user.
 */

type DB = { proposals: Record<string, TProposal> };

const EMPTY_DB: DB = { proposals: {} };

interface DocBackend {
  read(): Promise<DB>;
  write(db: DB): Promise<void>;
}

/* ------------------------------- fs backend ------------------------------- */

const FS_PATH = path.join(process.cwd(), ".data", "proposals-db.json");

const fsBackend: DocBackend = {
  async read() {
    try {
      const raw = await fs.readFile(FS_PATH, "utf-8");
      return JSON.parse(raw) as DB;
    } catch {
      return EMPTY_DB;
    }
  },
  async write(db) {
    await fs.mkdir(path.dirname(FS_PATH), { recursive: true });
    await fs.writeFile(FS_PATH, JSON.stringify(db, null, 2), "utf-8");
  },
};

/* ------------------------------ blob backend ------------------------------ */

const BLOB_KEY = "proposals/db.json";

const blobBackend: DocBackend = {
  async read() {
    const { blobs } = await list({ prefix: BLOB_KEY, limit: 1 });
    const hit = blobs.find((b) => b.pathname === BLOB_KEY);
    if (!hit) return EMPTY_DB;
    // bust the CDN cache — we always want the latest document
    const res = await fetch(`${hit.url}?ts=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return EMPTY_DB;
    return (await res.json()) as DB;
  },
  async write(db) {
    await put(BLOB_KEY, JSON.stringify(db), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60, // minimum allowed; reads cache-bust anyway
      contentType: "application/json",
    });
  },
};

function backend(): DocBackend {
  return process.env.BLOB_READ_WRITE_TOKEN ? blobBackend : fsBackend;
}

/* --------------------------------- store ---------------------------------- */

export type ProposalSummary = {
  id: string;
  slug: string;
  status: TProposal["status"];
  clientName: string;
  eventTitle: string;
  eventDate?: string;
  updatedAt: string;
  seed?: boolean;
};

export function toSummary(p: TProposal, seed = false): ProposalSummary {
  return {
    id: p.id,
    slug: p.slug,
    status: p.status,
    clientName: p.client.name,
    eventTitle: p.event.title,
    eventDate: p.event.date,
    updatedAt: p.updatedAt,
    seed: seed || undefined,
  };
}

export async function listProposals(): Promise<ProposalSummary[]> {
  const db = await backend().read();
  return Object.values(db.proposals)
    .map((p) => toSummary(p))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getProposal(id: string): Promise<TProposal | null> {
  const db = await backend().read();
  return db.proposals[id] ?? null;
}

export async function getProposalBySlugFromStore(slug: string): Promise<TProposal | null> {
  const db = await backend().read();
  return Object.values(db.proposals).find((p) => p.slug === slug) ?? null;
}

export async function saveProposal(proposal: TProposal): Promise<TProposal> {
  const validated = Proposal.parse({
    ...proposal,
    updatedAt: new Date().toISOString(),
  });
  const be = backend();
  const db = await be.read();
  db.proposals[validated.id] = validated;
  await be.write(db);
  return validated;
}

export async function deleteProposal(id: string): Promise<boolean> {
  const be = backend();
  const db = await be.read();
  if (!db.proposals[id]) return false;
  delete db.proposals[id];
  await be.write(db);
  return true;
}
