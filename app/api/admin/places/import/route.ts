import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/places/import
 * Body: {
 *   photoName: string;      // "places/<id>/photos/<ref>" from /places/search
 *   venue?: string;         // used for the folder + alt scaffold
 *   attribution?: string;   // author credit from the search result — kept on the asset
 *   maxWidthPx?: number;    // default 1600
 * }
 *
 * Downloads the Google photo and persists it — the hotlinked Google URL never
 * enters a document (same persist-immediately doctrine as Higgsfield assets).
 * Returns an ImageAsset-shaped body: { url, alt, source: "google", attribution }.
 *
 * Dev: saves under public/uploads/places/. Prod: Vercel Blob (deploy task #7).
 */
export async function POST(req: Request) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Venue photo import is not configured — add GOOGLE_PLACES_API_KEY to .env.local." },
      { status: 503 }
    );
  }
  if (process.env.VERCEL) {
    return NextResponse.json(
      { error: "Photo persistence on Vercel lands with the Blob storage task." },
      { status: 501 }
    );
  }

  let photoName = "";
  let venue = "";
  let attribution = "";
  let maxWidthPx = 1600;
  try {
    const body = await req.json();
    photoName = String(body?.photoName ?? "");
    venue = String(body?.venue ?? "").trim();
    attribution = String(body?.attribution ?? "").trim();
    if (body?.maxWidthPx) maxWidthPx = Math.min(Math.max(Number(body.maxWidthPx), 200), 4000);
  } catch {
    /* falls through to validation below */
  }
  if (!/^places\/[^/]+\/photos\/[^/]+$/.test(photoName)) {
    return NextResponse.json(
      { error: "Provide photoName as returned by /api/admin/places/search." },
      { status: 400 }
    );
  }

  const mediaUrl = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${maxWidthPx}&key=${key}`;
  const res = await fetch(mediaUrl);
  if (!res.ok) {
    return NextResponse.json({ error: `Photo download failed (${res.status})` }, { status: 502 });
  }
  const contentType = res.headers.get("content-type") ?? "image/jpeg";
  const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
  const bytes = Buffer.from(await res.arrayBuffer());

  const folder =
    venue
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "venue";
  const hash = crypto.createHash("sha1").update(photoName).digest("hex").slice(0, 10);
  const rel = `uploads/places/${folder}/${hash}.${ext}`;
  const abs = path.join(process.cwd(), "public", rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, bytes);

  return NextResponse.json({
    url: `/${rel}`,
    alt: venue ? `${venue} — house photo from the venue's Google listing` : "",
    source: "google",
    attribution: attribution || undefined,
  });
}
