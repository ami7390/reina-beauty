
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.reina.click";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/academie",
    "/boutique",
    "/coiffures-tarifs",
    "/contact",
    "/formation",
    "/formations-beaute",
    "/menu-et-tarifs",
    "/produits-pousse",
    "/reservation-contact",
    "/soins-capillaires",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
