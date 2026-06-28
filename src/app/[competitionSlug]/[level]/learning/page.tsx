import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CurriculumTopicExplorer } from "@/components/CurriculumTopicExplorer";
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
import { formatApproximateCount } from "@/lib/format";
import { subjectCoursePath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

function subjectSlugFromName(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-");
}

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

  const schoolLevel: SchoolLevelFilter | undefined =
    selectedLevel === "middle-school"
      ? "MIDDLE_SCHOOL"
      : selectedLevel === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;

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

    const emojiMap: Record<string, string> = {
      "Biology": "🧬",
      "Chemistry": "⚗️",
      "Physics": "⚛️",
      "Earth & Space": "🌍",
      "Energy": "⚡",
      "Math": "∑"
    };

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
            {subjectCounts.map(({ subject: item }) => {
              const emoji = emojiMap[item.name] || "📚";
              const counts = subjectCounts.find(sc => sc.subject.name === item.name)?.counts ?? { questions: 0, lessons: 0 };
              return (
                <Link
                  key={item.slug}
                  className="subject-card"
                  href={`/${competitionSlug}/${level}/learning/subject/${subjectSlugFromName(item.name)}`}
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

  if (isScienceBowlWithLevel && curriculumSubject) {
    return (
      <section className="section">
        <div className="container stack">
          <section className="card spacious curriculum-hero">
            <div className="curriculum-hero-copy stack">
              <span className="eyebrow">Science Bowl middle school</span>
              <h1>{curriculumSubject.name}</h1>
              <p className="subtitle">{curriculumSubject.shortDescription}</p>
              <p>{curriculumSubject.whyItMatters}</p>
              <p className="curriculum-value-copy">
                Medal Minds is organizing this track around the 20% of content that tends to produce 80% of Science Bowl points.
              </p>
              <div className="badge-list">
                {curriculumSubject.highYieldTopics.map((topic) => (
                  <span className="badge" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div className="curriculum-source-card">
              <span className="eyebrow">Primary sources</span>
              <div className="stack compact">
                {curriculumSubject.sources.map((source) => (
                  <div className="curriculum-source-row" key={source}>
                    {source}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="stack">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Grade progression</span>
                <h2>Build the highest-yield middle-school foundation first</h2>
                <p>Start with core recall in grade 6, then layer in genetics, systems, and deeper competition detail.</p>
              </div>
            </div>

            <CurriculumTopicExplorer competitionSlug={competitionSlug} lessons={lessons} subject={curriculumSubject} />
          </section>

          <section className="stack">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Existing lessons</span>
                <h2>Current concept lessons in this subject</h2>
                <p>These stay intact and continue powering the Learn more flow for practice questions and tests.</p>
              </div>
            </div>
            {lessons.length ? (
              <div className="grid two">
                {lessons.map((lesson) => (
                  <LessonCard lesson={lesson} key={lesson.id} />
                ))}
              </div>
            ) : (
              <div className="empty">No lessons are available yet for this subject.</div>
            )}
          </section>
        </div>
      </section>
    );
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
