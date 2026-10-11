import { NextRequest, NextResponse } from "next/server";
import { fetchUpstream } from "@/lib/api";

/**
 * Thin proxy so client components can load data without CORS problems,
 * with automatic fallback to the alternative API URLs.
 *   /api/market/products?category=chal  ->  {API}/products?category=chal
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const upstreamPath = `/${path.map(encodeURIComponent).join("/")}${req.nextUrl.search}`;
  const result = await fetchUpstream(upstreamPath);

  if (!result.ok) {
    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: result.status === 404 ? 404 : 502 }
    );
  }
  return NextResponse.json(result.data);
}
