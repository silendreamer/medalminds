import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SimplePracticeQuestion } from "@/components/SimplePracticeQuestion";
import Link from "next/link";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import { practicePath } from "@/lib/routes";
import {
  getCompetitionBySlug,
  getContentCountsForSubject,
  getLessonsByCompetition,
  getLessonsByIds,
  getQuestionById,
  getRandomQuestionByCompetition,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";
import "@/app/practice-page.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string }>;
}): Promise<Metadata> {
  const { competitionSlug } = await params;
  const { subject, level } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) return {};
  const levelLabel = competitionSlug === "science-bowl" && level === "middle-school" ? "Middle School " : "";
  const subjectLabel = subject ? `${subject} ` : "";

  return buildMetadata({
    title: `${levelLabel}${competition.name} ${subjectLabel}Practice Questions | Medal Minds`,
    description: `Practice ${levelLabel.toLowerCase()}${competition.name} ${subjectLabel.toLowerCase()}questions with instant review, explanations, and competition-focused study links.`,
    path: `/${competitionSlug}/practice`,
    keywords: [`${competition.name} practice questions`, `${competition.name} ${subjectLabel}practice`, subject ?? ""].filter(Boolean)
  });
}

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string; q?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level, q } = await searchParams;
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
  const curriculumSubjects = isScienceBowlMiddleSchool && !subject ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];

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
              action: "Practice",
              current: "Practice"
            })}
          />
          <div className="simple-heading">
            <span className="eyebrow">{competition.name}</span>
            <h1>Middle School Practice</h1>
            <p className="subtitle">Pick a subject to start practicing questions.</p>
          </div>
          <div className="grid two curriculum-subject-grid">
            {subjectCounts.map(({ subject: item, counts }) => (
              <Link
                className="card spacious stack curriculum-subject-card"
                href={`${practicePath(competitionSlug)}?level=middle-school&subject=${encodeURIComponent(item.name)}`}
                key={item.slug}
              >
                <div className="stack compact">
                  <span className="eyebrow">Science Bowl middle school</span>
                  <h2>{item.name}</h2>
                  <p>{item.shortDescription}</p>
                </div>
                <div className="mini-stat-list">
                  <span>
                    <strong>{formatApproximateCount(counts.questions)}</strong>
                    <small>Questions</small>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Get all available subjects for the filter
  const allSubjects = isScienceBowlMiddleSchool
    ? await getScienceBowlMiddleSchoolCurriculumSubjects()
    : [];
  const subjectNames = allSubjects.map((s) => s.name);

  const question = q
    ? await getQuestionById(competitionSlug, q, subject, schoolLevel)
    : await getRandomQuestionByCompetition(competitionSlug, subject, schoolLevel);
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);

  // Get linked lessons from question.lessonIds
  let linkedLessons: typeof lessons = [];

  if (question?.lessonIds && question.lessonIds.length > 0) {
    linkedLessons = await getLessonsByIds(question.lessonIds, competitionSlug);
  }

  const learnMoreLesson = linkedLessons[0] ?? lessons[0];

  return (
    <section className="section practice-page-section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            action: "Practice",
            actionHref: `${practicePath(competitionSlug)}${level ? `?level=${level}` : ""}`,
            subject,
            current: subject ? undefined : "Practice"
          })}
        />

        {/* Practice page hero with level toggle */}
        {isScienceBowlMiddleSchool && (
          <div className="practice-page-hero">
            <div>
              <span className="eyebrow">{competition.name}</span>
              <h1>{subject ?? "Practice"} Questions</h1>
            </div>
            <div className="level-toggle-wrapper">
              <span className="level-toggle-label">Division</span>
              <div className="level-toggle">
                <Link
                  href={`${practicePath(competitionSlug)}?level=middle-school${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`}
                  className={`level-toggle-btn ${level === "middle-school" ? "active" : ""}`}
                >
                  Middle School
                </Link>
                <Link
                  href={`${practicePath(competitionSlug)}?level=high-school${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`}
                  className={`level-toggle-btn ${level === "high-school" ? "active" : ""}`}
                >
                  High School
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Subject filter bar - only show for Science Bowl middle school */}
        {isScienceBowlMiddleSchool && subjectNames.length > 0 && (
          <div className="subject-filter-bar">
            <span className="filter-label">Practice:</span>
            <div className="subject-chips">
              {subjectNames.map((subj) => (
                <Link
                  key={subj}
                  href={`${practicePath(competitionSlug)}?level=${level || "middle-school"}&subject=${encodeURIComponent(subj)}`}
                  className={`subject-chip ${subject === subj ? "selected" : ""}`}
                >
                  {subj}
                </Link>
              ))}
              <Link
                href={`${practicePath(competitionSlug)}?level=${level || "middle-school"}`}
                className={`subject-chip ${!subject ? "selected" : ""}`}
              >
                All subjects
              </Link>
            </div>
          </div>
        )}

        {/* Main content area with sidebar */}
        <div className="practice-layout">
          {/* Sidebar with session stats and buzzer mode */}
          <aside className="practice-sidebar">
            <div className="session-stats-card">
              <h3>Session Stats</h3>
              <div className="stat-row">
                <div className="stat-box">
                  <span className="stat-label">Correct</span>
                  <strong>0</strong>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Incorrect</span>
                  <strong>0</strong>
                </div>
              </div>
              <div className="stat-row">
                <div className="stat-box">
                  <span className="stat-label">Streak</span>
                  <strong>0</strong>
                </div>
              </div>
              <div className="progress-section">
                <span className="progress-label">Progress</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>

            <div className="buzzer-mode-card card">
              <h4>Buzzer Mode</h4>
              <p>Train your reaction time head-to-head in real-time.</p>
              <Link href={`/${competitionSlug}/buzzer`} className="button">
                Enter Arena
              </Link>
            </div>
          </aside>

          {/* Main question display area */}
          <main className="practice-main">
            {question ? (
              <SimplePracticeQuestion
                question={question}
                lesson={learnMoreLesson}
                linkedLessons={linkedLessons.length > 0 ? linkedLessons : undefined}
              />
            ) : (
              <div className="empty">No questions are available yet.</div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}
