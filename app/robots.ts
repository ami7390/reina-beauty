
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/maintenance",
      ],
    },
    sitemap: "https://reina.click/sitemap.xml",
  };
}
