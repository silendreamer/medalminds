import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseLayout } from "@/components/CourseLayout";
import {
  getCompetitionBySlug,
  getLessonBySlug,
  getSubjectWithTree,
  isCompetitionSlug
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ competitionSlug: string; subjectSlug: string }>;
}): Promise<Metadata> {
  const { competitionSlug, subjectSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const tree = await getSubjectWithTree(competitionSlug, subjectSlug);
  if (!tree) return {};
  return buildMetadata({
    title: `${tree.name} | ${competitionSlug === "science-bowl" ? "Science Bowl" : competitionSlug} Lessons`,
    description: `Study ${tree.name} topics with structured lessons, key concepts, and review questions built for competition prep.`,
    path: `/${competitionSlug}/learning/subject/${subjectSlug}`
  });
}

export default async function SubjectCoursePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string; subjectSlug: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { competitionSlug, subjectSlug } = await params;
  const { lesson: lessonSlug } = await searchParams;

  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const tree = await getSubjectWithTree(competitionSlug, subjectSlug);
  if (!tree) {
    return (
      <section className="section">
        <div className="container stack">
          <div className="course-content-empty">
            <span className="eyebrow">{competition.name}</span>
            <h1>Full curriculum coming soon</h1>
            <p className="subtitle">
              The structured course view is available at{" "}
              <a href="https://medalminds.com">medalminds.com</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const activeLesson = lessonSlug
    ? await getLessonBySlug(competitionSlug, lessonSlug)
    : null;

  return (
    <>
      <div style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "18px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <span style={{ fontSize: "13px", color: "#667085", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            <a style={{ color: "#667085", textDecoration: "none", cursor: "pointer" }}>Science Bowl</a>
            <span style={{ color: "#c2c7d0" }}>/</span>
            <a style={{ color: "#667085", textDecoration: "none", cursor: "pointer" }}>Learn</a>
            <span style={{ color: "#c2c7d0" }}>/</span>
            <span style={{ color: "#1a2745" }}>{tree.name}</span>
          </span>
        </div>
      </div>

      <div style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "18px", paddingBottom: "44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <CourseLayout
            tree={tree}
            activeLesson={activeLesson ?? null}
            activeLessonSlug={lessonSlug ?? null}
            competitionSlug={competitionSlug}
          />
        </div>
      </div>
    </>
  );
}
