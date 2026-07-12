import { NextRequest, NextResponse } from "next/server";
import { searchTitles } from "@/lib/tmdb";

// GET /api/movies?q=batman
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q");
  if (!q) return NextResponse.json({ results: [] });

  try {
    const results = await searchTitles(q);
    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
