import type { MetadataRoute } from "next";

import { getAllNews } from "@/entities/news/server";
import { getSiteUrl } from "@/shared/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const news = await getAllNews();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...news.map((item) => ({
      url: `${baseUrl}/news/${item.id}`,
      lastModified: item.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
