import type { MetadataRoute } from "next";
import { competitions } from "@/data/competitions";

const BASE_URL = "https://medalminds.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, priority: 1.0 },
    { url: `${BASE_URL}/science-bowl/info-session`, lastModified: now, priority: 0.6 },
    { url: `${BASE_URL}/science-bowl/buzzer`, lastModified: now, priority: 0.8 },
  ];

  const competitionRoutes: MetadataRoute.Sitemap = competitions.flatMap((c) => [
    { url: `${BASE_URL}/${c.slug}`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/${c.slug}/practice`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/${c.slug}/learning`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/${c.slug}/tests`, lastModified: now, priority: 0.7 },
  ]);

  return [...staticRoutes, ...competitionRoutes];
}
