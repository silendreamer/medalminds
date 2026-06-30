import type { MetadataRoute } from "next";
import { competitions } from "@/data/competitions";
import { scienceBowlMiddleSchoolSubjects } from "@/data/scienceBowlMiddleSchoolCurriculum";

const BASE_URL = "https://medalminds.com";

const LEVELS = ["middle-school", "high-school"] as const;

function subjectSlug(name: string) {
  return name.toLowerCase().replace(/[\s&]+/g, "-");
}

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
      { url: `${base}/practice/${subjectSlug(s.name)}`, lastModified: now, priority: 0.8 },
      { url: `${base}/tests/subject/${subjectSlug(s.name)}`, lastModified: now, priority: 0.7 },
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

  // Science Olympiad and Math Olympiad (no level-scoped routes yet)
  const otherCompetitionRoutes: MetadataRoute.Sitemap = competitions
    .filter((c) => c.slug !== "science-bowl")
    .flatMap((c) => [
      { url: `${BASE_URL}/${c.slug}`, lastModified: now, priority: 0.9 },
      { url: `${BASE_URL}/${c.slug}/practice`, lastModified: now, priority: 0.8 },
      { url: `${BASE_URL}/${c.slug}/learning`, lastModified: now, priority: 0.8 },
      { url: `${BASE_URL}/${c.slug}/tests`, lastModified: now, priority: 0.7 },
    ]);

  return [...staticRoutes, ...scienceBowlRoutes, ...otherCompetitionRoutes];
}
