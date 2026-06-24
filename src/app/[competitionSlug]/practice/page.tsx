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
  getPrimaryConceptLessonForQuestion,
  getQuestionById,
  getRandomQuestionByCompetition,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { buildMetadata } from "@/lib/seo";

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

  const question = q
    ? await getQuestionById(competitionSlug, q, subject, schoolLevel)
    : await getRandomQuestionByCompetition(competitionSlug, subject, schoolLevel);
  const lessons = await getLessonsByCompetition(competitionSlug, subject, schoolLevel);
  const conceptLesson = question ? await getPrimaryConceptLessonForQuestion(question.id) : undefined;
  const learnMoreLesson = conceptLesson ?? lessons[0];

  return (
    <section className="section">
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
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{subject ?? "Practice"} Questions</h1>
          </div>
        </div>
        {question ? <SimplePracticeQuestion question={question} lesson={learnMoreLesson} /> : <div className="empty">No questions are available yet.</div>}
      </div>
    </section>
  );
}
