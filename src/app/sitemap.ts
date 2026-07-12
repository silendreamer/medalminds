import type { MetadataRoute } from "next";
import { competitions } from "@/data/competitions";
import { scienceBowlMiddleSchoolSubjects } from "@/data/scienceBowlMiddleSchoolCurriculum";
import { siteUrl } from "@/lib/seo";
import { slugifySubject } from "@/lib/subjects";

const BASE_URL = siteUrl.replace(/\/$/, "");

const LEVELS = ["middle-school", "high-school"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, priority: 1.0 },
    { url: `${BASE_URL}/science-bowl`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/science-bowl/info-session`, lastModified: now, priority: 0.6 },
    { url: `${BASE_URL}/science-bowl/buzzer`, lastModified: now, priority: 0.8 },
  ];

  // Science Bowl: level hub + section pages + per-subject practice/tests/learning
  const scienceBowlRoutes: MetadataRoute.Sitemap = LEVELS.flatMap((level) => {
    const base = `${BASE_URL}/science-bowl/${level}`;
    const subjectRoutes = scienceBowlMiddleSchoolSubjects.flatMap((s) => [
      { url: `${base}/practice/${slugifySubject(s.name)}`, lastModified: now, priority: 0.8 },
      { url: `${base}/tests/subject/${slugifySubject(s.name)}`, lastModified: now, priority: 0.7 },
      { url: `${base}/learning/subject/${s.slug}`, lastModified: now, priority: 0.7 },
    ]);

    return [
      { url: base, lastModified: now, priority: 0.9 },
      { url: `${base}/practice`, lastModified: now, priority: 0.8 },
      { url: `${base}/learning`, lastModified: now, priority: 0.8 },
      { url: `${base}/tests`, lastModified: now, priority: 0.7 },
      ...subjectRoutes,
    ];
  });

  // Science Olympiad and Math Olympiad (hub page only — sub-routes are not yet live)
  const otherCompetitionRoutes: MetadataRoute.Sitemap = competitions
    .filter((c) => c.slug !== "science-bowl")
    .map((c) => ({ url: `${BASE_URL}/${c.slug}`, lastModified: now, priority: 0.9 }));

  return [...staticRoutes, ...scienceBowlRoutes, ...otherCompetitionRoutes];
}
