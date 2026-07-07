import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CourseLayout } from "@/components/CourseLayout";
import {
  getCompetitionBySlug,
  getLessonBySlug,
  getSubjectWithTree,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params
}: {
  params: Promise<{ competitionSlug: string; level: string; subjectSlug: string }>;
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
  params: Promise<{ competitionSlug: string; level: string; subjectSlug: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { competitionSlug, level, subjectSlug } = await params;
  const { lesson: lessonSlug } = await searchParams;

  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const schoolLevel: SchoolLevelFilter | undefined =
    level === "middle-school" ? "MIDDLE_SCHOOL" : level === "high-school" ? "HIGH_SCHOOL" : undefined;

  const tree = await getSubjectWithTree(competitionSlug, subjectSlug, schoolLevel);
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

  const levelDisplay = level === "middle-school" ? "Middle School" : "High School";
  const activeLesson = lessonSlug
    ? await getLessonBySlug(competitionSlug, lessonSlug, levelDisplay)
    : null;

  // Find topic/subtopic for active lesson to show in breadcrumb
  let activeTopic = undefined;
  if (activeLesson) {
    for (const topic of tree.topics) {
      for (const subTopic of topic.subTopics) {
        if (subTopic.lessons.some((l) => l.slug === lessonSlug)) {
          activeTopic = { topicName: topic.name, subTopicName: subTopic.name };
          break;
        }
      }
      if (activeTopic) break;
    }
  }

  return (
    <>
      <div style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "18px", paddingBottom: "44px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <CourseLayout
            tree={tree}
            activeLesson={activeLesson ?? null}
            activeLessonSlug={lessonSlug ?? null}
            competitionSlug={competitionSlug}
            activeTopic={activeTopic}
          />
        </div>
      </div>
    </>
  );
}
