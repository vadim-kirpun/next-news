import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/shared/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/news/create"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
