import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";
import Link from "next/link";
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
    title: `${levelLabel}${competition.name} ${subjectLabel}Practice Questions | Medal Minds`,
    description: `Practice ${levelLabel.toLowerCase()}${competition.name} ${subjectLabel.toLowerCase()}questions with instant review, explanations, and competition-focused study links.`,
    path: `/${competitionSlug}/${level}/practice`,
    keywords: [`${competition.name} practice questions`, `${competition.name} ${subjectLabel}practice`, subject ?? ""].filter(Boolean)
  });
}

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
  searchParams: Promise<{ subject?: string; q?: string }>;
}) {
  const { competitionSlug, level } = await params;
  const { subject, q } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const schoolLevel: SchoolLevelFilter | undefined =
    level === "middle-school"
      ? "MIDDLE_SCHOOL"
      : level === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;
  const isScienceBowl = competitionSlug === "science-bowl";
  const curriculumSubjects = isScienceBowl && !subject ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];

  const emojiMap: Record<string, string> = {
    "Biology": "🧬",
    "Chemistry": "⚗️",
    "Physics": "⚛️",
    "Earth & Space": "🌍",
    "Energy": "⚡",
    "Math": "∑"
  };

  if (isScienceBowl && !subject) {
    const subjectCounts = await Promise.all(
      curriculumSubjects.map(async (item) => ({
        subject: item,
        counts: await getContentCountsForSubject(competitionSlug, item.name, schoolLevel)
      }))
    );

    const levelLabel = level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : "Practice";

    return (
      <section className="section science-bowl-learning">
        <div className="container stack">
          <div className="hub-header">
            <div>
              <span className="eyebrow">Science Bowl</span>
              <h1>{levelLabel} Practice</h1>
              <p className="subtitle">Pick a subject to drill toss-up and bonus questions.</p>
            </div>
          </div>
          <div className="subjects-grid">
            {subjectCounts.map(({ subject: item, counts }) => {
              const emoji = emojiMap[item.name] || "📚";
              return (
                <Link
                  key={item.slug}
                  className="subject-card"
                  href={`/${competitionSlug}/${level}/practice?subject=${encodeURIComponent(item.name)}`}
                >
                  <div className="subject-card-icon">{emoji}</div>
                  <h4>{item.name}</h4>
                  <span className="subject-card-count">{formatApproximateCount(counts.questions)} questions</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // Get all available subjects for the subject filter bar
  const allSubjects = isScienceBowl ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];
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
      <div className="container">
        {question ? (
          <PracticeSession
            initialQuestion={question}
            lesson={learnMoreLesson}
            linkedLessons={linkedLessons.length > 0 ? linkedLessons : undefined}
            competitionSlug={competitionSlug}
            level={level}
            subject={subject}
            subjectNames={subjectNames}
          />
        ) : (
          <div className="empty">No questions are available yet.</div>
        )}
      </div>
    </section>
  );
}
