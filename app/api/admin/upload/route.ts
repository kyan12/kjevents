import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const MAX_BYTES = 15 * 1024 * 1024;
const EXT_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * POST /api/admin/upload — multipart form, field "file" (+ optional "kind").
 *
 * Manual image intake for the builder: the client's own venue shots, décor
 * references, anything that shouldn't come from a listing or a model.
 * Returns an ImageAsset-shaped body: { url, alt: "", source: "upload" }.
 *
 * Dev: saves under public/uploads/<kind>/. Prod: Vercel Blob (deploy task #7).
 */
export async function POST(req: Request) {
  if (process.env.VERCEL) {
    return NextResponse.json(
      { error: "Upload persistence on Vercel lands with the Blob storage task." },
      { status: 501 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Send multipart/form-data with a 'file' field." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing 'file' field." }, { status: 400 });
  }
  const ext = EXT_BY_TYPE[file.type];
  if (!ext) {
    return NextResponse.json({ error: "Only JPEG, PNG, or WebP images." }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File exceeds the 15 MB limit." }, { status: 413 });
  }

  const kind =
    String(form.get("kind") ?? "manual")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "")
      .slice(0, 24) || "manual";
  const name = crypto.randomBytes(8).toString("hex");
  const rel = `uploads/${kind}/${name}.${ext}`;
  const abs = path.join(process.cwd(), "public", rel);
  await mkdir(path.dirname(abs), { recursive: true });
  await writeFile(abs, Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/${rel}`, alt: "", source: "upload" });
}
