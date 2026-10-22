import { MetadataRoute } from "next";
import enrichedData from "@/data/enriched_db.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dentalseohub.com";

  const cityEntries: MetadataRoute.Sitemap = enrichedData.cities.map((city) => ({
    url: `${baseUrl}/dental-agencies/${city.slug}`,
    lastModified: new Date(enrichedData.generatedAt || new Date()),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...cityEntries,
  ];
}
