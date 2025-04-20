// /api/proxy-image.ts

import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const imageUrl = req.nextUrl.searchParams.get("url");

  if (!imageUrl) return new Response("Missing URL", { status: 400 });

  const imageRes = await fetch(imageUrl);
  const contentType = imageRes.headers.get("content-type") || "image/jpeg";

  const buffer = await imageRes.arrayBuffer();

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
