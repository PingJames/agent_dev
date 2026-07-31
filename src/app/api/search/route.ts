import { NextRequest, NextResponse } from "next/server";
import { search, searchByType } from "@/lib/search";
import type { SearchResult } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") as SearchResult["type"] | null;
  const limit = parseInt(searchParams.get("limit") || "20", 10);

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [], total: 0 });
  }

  let results;
  if (type && ["blog", "project", "interview", "roadmap"].includes(type)) {
    results = searchByType(query, type, limit);
  } else {
    results = search(query, limit);
  }

  return NextResponse.json({
    results: results.map((r) => r.item),
    total: results.length,
    scores: results.map((r) => Math.round((1 - (r.score || 0)) * 100)),
  });
}
