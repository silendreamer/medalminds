import type { MetadataRoute } from "next";
import { competitions } from "@/data/competitions";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/science-bowl/info-session"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];

  const competitionRoutes: MetadataRoute.Sitemap = competitions.flatMap((competition) => {
    const priority = competition.slug === "science-bowl" ? 0.95 : 0.75;

    return [
      {
        url: absoluteUrl(`/${competition.slug}`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority
      },
      {
        url: absoluteUrl(`/${competition.slug}/learning`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: priority - 0.05
      },
      {
        url: absoluteUrl(`/${competition.slug}/practice`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: priority - 0.05
      },
      {
        url: absoluteUrl(`/${competition.slug}/tests`),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: priority - 0.1
      }
    ];
  });

  return [
    ...staticRoutes,
    ...competitionRoutes,
    {
      url: absoluteUrl("/science-bowl/buzzer"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85
    }
  ];
}
