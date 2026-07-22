import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { LessonCard } from "@/components/LessonCard";
import {
  getCompetitionBySlug,
  getContentCountsForSubject,
  getLessonsByCompetition,
  getScienceBowlMiddleSchoolCurriculumSubjectByName,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  getSubjectsForCompetition,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { subjectCoursePath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { slugifySubject, subjectEmoji } from "@/lib/subjects";
import { parseSchoolLevel } from "@/lib/levels";

// Note: this route reads `searchParams` (?subject=) directly in the page
// component to switch between the subject grid and a subject's lesson list,
// which forces Next to render it dynamically on every request — a
// generateStaticParams here would have no effect. Splitting the subject
// detail view onto its own path segment would let the subject-grid case be
// prerendered; left dynamic for now, covered by loading.tsx instead.

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
  searchParams: Promise<{ subject?: string }>;
}): Promise<Metadata> {
  const { competitionSlug, level } = await params;
  const { subject } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) return {};
  const levelLabel = level === "middle-school" ? "Middle School " : "";
  const subjectLabel = subject ? `${subject} ` : "";

  return buildMetadata({
    title: `${levelLabel}${competition.name} ${subjectLabel}Lessons & Study Guide | Medal Minds`,
    description: `Study ${levelLabel.toLowerCase()}${competition.name} ${subjectLabel.toLowerCase()}topics with focused lessons, high-yield concepts, and review paths built for competition prep.`,
    path: `/${competitionSlug}/${level}/learning`,
    keywords: [`${competition.name} lessons`, `${competition.name} study guide`, subject ?? ""].filter(Boolean)
  });
}

export default async function LearningPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
  searchParams: Promise<{ subject?: string }>;
}) {
  const { competitionSlug, level } = await params;
  const { subject } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const isScienceBowl = competitionSlug === "science-bowl";
  const selectedLevel = level;

  const schoolLevel: SchoolLevelFilter | undefined = parseSchoolLevel(selectedLevel);

  const isScienceBowlWithLevel = isScienceBowl && schoolLevel;
  const curriculumSubjects = isScienceBowlWithLevel ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];
  const curriculumSubject = isScienceBowlWithLevel ? await getScienceBowlMiddleSchoolCurriculumSubjectByName(subject) : undefined;
  const dbSubjects = (!isScienceBowlWithLevel && !subject && isScienceBowl)
    ? await getSubjectsForCompetition(competitionSlug)
    : [];
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);

  // Show subject grid for Science Bowl when no subject is selected
  if (isScienceBowlWithLevel && !subject) {
    const subjectCounts = await Promise.all(
      curriculumSubjects.map(async (item) => ({
        subject: item,
        counts: await getContentCountsForSubject(competitionSlug, item.name, schoolLevel)
      }))
    );

    const visibleSubjects = subjectCounts.filter(({ counts }) => counts.lessons > 0);

    return (
      <section className="section science-bowl-learning">
        <div className="container stack">
          <div className="hub-header">
            <div>
              <span className="eyebrow">Science Bowl</span>
              <h1>{selectedLevel === "middle-school" ? "Middle School" : "High School"} Learning Paths</h1>
              <p className="subtitle">
                Study the six National Science Bowl {selectedLevel === "middle-school" ? "middle-school" : "high school"} subject areas in a cleaner grade-by-grade order.
              </p>
            </div>
          </div>

          <div className="subjects-grid">
            {visibleSubjects.map(({ subject: item, counts }) => {
              const emoji = subjectEmoji(item.name);
              return (
                <Link
                  key={item.slug}
                  className={`subject-card subject-card--${slugifySubject(item.name)}`}
                  href={`/${competitionSlug}/${level}/learning/subject/${slugifySubject(item.name)}`}
                >
                  <div className="subject-card-icon">{emoji}</div>
                  <h4>{item.name}</h4>
                  <span className="subject-card-count">{counts.lessons} {counts.lessons === 1 ? "lesson" : "lessons"}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // A subject is selected via the legacy ?subject= param. That flow used to
  // render a separate topic explorer that linked to the now-retired standalone
  // lesson route; it is replaced by the two-pane course view. Redirect there so
  // any stale ?subject= link lands on the canonical experience.
  if (isScienceBowlWithLevel && curriculumSubject) {
    redirect(subjectCoursePath(competitionSlug, level, curriculumSubject.slug));
  }

  if (dbSubjects.length > 0) {
    return (
      <section className="section">
        <div className="container stack">
          <div className="simple-heading">
            <span className="eyebrow">{competition.name}</span>
            <h1>Choose a subject</h1>
            <p className="subtitle">
              Select a subject to open the course view — a structured guide through topics, subtopics, and lessons.
            </p>
          </div>
          <div className="grid two">
            {dbSubjects.map((subj) => (
              <Link
                key={subj.id}
                className="card spacious stack"
                href={subjectCoursePath(competitionSlug, level, subj.slug)}
              >
                <span className="eyebrow">{competition.name}</span>
                <h2>{subj.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container stack">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{subject ?? "Learning"} Lessons</h1>
          </div>
        </div>
        {lessons.length ? (
          <div className="grid two">
            {lessons.map((lesson) => (
              <LessonCard lesson={lesson} key={lesson.id} />
            ))}
          </div>
        ) : (
          <div className="empty">No lessons are available yet.</div>
        )}
      </div>
    </section>
  );
}
