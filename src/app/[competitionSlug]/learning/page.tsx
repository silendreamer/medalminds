import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LessonCard } from "@/components/LessonCard";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getContentCountsForSubject,
  getLessonsByCompetition,
  getScienceBowlMiddleSchoolCurriculumSubjectByName,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { learningPath } from "@/lib/routes";

export default async function LearningPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const schoolLevel: SchoolLevelFilter | undefined =
    competitionSlug === "science-bowl" && level === "middle-school"
      ? "MIDDLE_SCHOOL"
      : competitionSlug === "science-bowl" && level === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;

  const isScienceBowlMiddleSchool = competitionSlug === "science-bowl" && schoolLevel === "MIDDLE_SCHOOL";
  const curriculumSubjects = isScienceBowlMiddleSchool ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];
  const curriculumSubject = isScienceBowlMiddleSchool ? await getScienceBowlMiddleSchoolCurriculumSubjectByName(subject) : undefined;
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);

  if (isScienceBowlMiddleSchool && !subject) {
    const subjectCounts = await Promise.all(
      curriculumSubjects.map(async (item) => ({
        subject: item,
        counts: await getContentCountsForSubject(competitionSlug, item.name, schoolLevel)
      }))
    );

    return (
      <section className="section">
        <div className="container stack">
          <Breadcrumbs
            items={buildStudyBreadcrumbs({
              competitionSlug,
              competitionName: competition.name,
              level,
              action: "Learning",
              current: "Learning"
            })}
          />
          <div className="simple-heading">
            <span className="eyebrow">{competition.name}</span>
            <h1>Middle School learning paths</h1>
            <p className="subtitle">
              Study the five official National Science Bowl middle-school subject areas in a cleaner grade-by-grade order,
              while keeping your existing concept lessons available underneath.
            </p>
          </div>

          <div className="grid two curriculum-subject-grid">
            {subjectCounts.map(({ subject: item, counts }) => (
              <Link
                className="card spacious stack curriculum-subject-card"
                href={`${learningPath(competitionSlug)}?level=middle-school&subject=${encodeURIComponent(item.name)}`}
                key={item.slug}
              >
                <div className="stack compact">
                  <span className="eyebrow">Science Bowl middle school</span>
                  <h2>{item.name}</h2>
                  <p>{item.shortDescription}</p>
                </div>
                <div className="badge-list">
                  {item.highYieldTopics.slice(0, 3).map((topic) => (
                    <span className="badge neutral" key={topic}>
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="mini-stat-list">
                  <span>
                    <strong>{formatApproximateCount(counts.questions)}</strong>
                    <small>Questions</small>
                  </span>
                  <span>
                    <strong>{formatApproximateCount(counts.lessons)}</strong>
                    <small>Lessons</small>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isScienceBowlMiddleSchool && curriculumSubject) {
    return (
      <section className="section">
        <div className="container stack">
          <Breadcrumbs
            items={buildStudyBreadcrumbs({
              competitionSlug,
              competitionName: competition.name,
              level,
              action: "Learning",
              subject: curriculumSubject.name
            })}
          />

          <section className="card spacious curriculum-hero">
            <div className="curriculum-hero-copy stack">
              <span className="eyebrow">Science Bowl middle school</span>
              <h1>{curriculumSubject.name}</h1>
              <p className="subtitle">{curriculumSubject.shortDescription}</p>
              <p>{curriculumSubject.whyItMatters}</p>
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

            <div className="curriculum-grade-stack">
              {curriculumSubject.grades.map((grade) => (
                <section className="card spacious curriculum-grade-card" key={grade.key}>
                  <div className="curriculum-grade-header">
                    <span className="eyebrow">{curriculumSubject.name}</span>
                    <h2>{grade.label}</h2>
                  </div>
                  <div className="grid two curriculum-unit-grid">
                    {grade.units.map((unit) => (
                      <article className="curriculum-unit-card" key={`${grade.key}-${unit.title}`}>
                        <h3>{unit.title}</h3>
                        <div className="curriculum-topic-list">
                          {unit.topics.map((topic) => (
                            <div className="curriculum-topic-row" key={topic.id}>
                              <span />
                              <p>{topic.title}</p>
                            </div>
                          ))}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
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

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            action: "Learning",
            subject,
            current: subject ? undefined : "Learning"
          })}
        />
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
