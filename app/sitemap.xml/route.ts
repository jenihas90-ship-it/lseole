import { NextRequest, NextResponse } from "next/server";
import enrichedData from "@/data/enriched_db.json";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // Determine live domain automatically from incoming request headers or env
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "lseole.vercel.app";
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
    ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
    : `${proto}://${host}`;

  const lastMod = enrichedData.generatedAt || new Date().toISOString().split("T")[0];

  const cityXml = enrichedData.cities
    .map(
      (city) => `  <url>
    <loc>${baseUrl}/dental-agencies/${city.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`
    )
    .join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
${cityXml}
</urlset>`;

  return new NextResponse(sitemapXml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
