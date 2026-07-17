import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/places/search?q=The Django NYC
 *
 * Venue lookup against Google Places (Text Search, New API) — the "link the
 * venue's Google Business Profile" entry point. The admin picks a result,
 * then pulls real interior photos via /api/admin/places/import.
 *
 * Requires GOOGLE_PLACES_API_KEY with Places API (New) enabled. Without it
 * the route answers 503 so the builder can hide the affordance entirely.
 */

type PlacePhoto = {
  name?: string;
  widthPx?: number;
  heightPx?: number;
  authorAttributions?: { displayName?: string }[];
};

type Place = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  googleMapsUri?: string;
  photos?: PlacePhoto[];
};

export async function GET(req: Request) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) {
    return NextResponse.json(
      {
        error:
          "Venue photo lookup is not configured — add GOOGLE_PLACES_API_KEY to .env.local (Places API (New) enabled) and restart the dev server.",
      },
      { status: 503 }
    );
  }

  const q = new URL(req.url).searchParams.get("q")?.trim();
  if (!q) return NextResponse.json({ error: "Provide ?q=<venue name>" }, { status: 400 });

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": [
        "places.id",
        "places.displayName",
        "places.formattedAddress",
        "places.googleMapsUri",
        "places.photos.name",
        "places.photos.widthPx",
        "places.photos.heightPx",
        "places.photos.authorAttributions",
      ].join(","),
    },
    body: JSON.stringify({ textQuery: q, maxResultCount: 6 }),
  });

  if (!res.ok) {
    const detail = await res.text();
    return NextResponse.json(
      { error: `Places search failed (${res.status})`, detail },
      { status: 502 }
    );
  }

  const data = (await res.json()) as { places?: Place[] };
  const places = (data.places ?? []).map((p) => ({
    placeId: p.id ?? "",
    name: p.displayName?.text ?? "",
    address: p.formattedAddress ?? "",
    mapsUri: p.googleMapsUri ?? "",
    photos: (p.photos ?? []).map((ph) => ({
      /** pass this to /api/admin/places/import */
      name: ph.name ?? "",
      widthPx: ph.widthPx,
      heightPx: ph.heightPx,
      attribution: (ph.authorAttributions ?? [])
        .map((a) => a.displayName)
        .filter(Boolean)
        .join(", "),
    })),
  }));

  return NextResponse.json({ places });
}
