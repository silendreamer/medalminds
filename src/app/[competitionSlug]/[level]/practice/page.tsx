import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";
import Link from "next/link";
import {
  getCompetitionBySlug,
  getContentCountsForSubject,
  getQuestionById,
  getRandomQuestionByCompetition,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  isCompetitionSlug,
  type SchoolLevelFilter,
} from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { practiceSubjectPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import { subjectEmoji } from "@/lib/subjects";
import { parseSchoolLevel } from "@/lib/levels";
import "@/app/practice-page.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
}): Promise<Metadata> {
  const { competitionSlug, level } = await params;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) return {};
  const levelLabel = level === "middle-school" ? "Middle School " : "";

  return buildMetadata({
    title: `${levelLabel}${competition.name} Practice Questions | Medal Minds`,
    description: `Practice ${levelLabel.toLowerCase()}${competition.name} questions with instant review, explanations, and competition-focused study links.`,
    path: `/${competitionSlug}/${level}/practice`,
    keywords: [`${competition.name} practice questions`, `${competition.name} practice`]
  });
}

export default async function PracticePage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string; level: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { competitionSlug, level } = await params;
  const { q } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const schoolLevel: SchoolLevelFilter | undefined = parseSchoolLevel(level);
  const isScienceBowl = competitionSlug === "science-bowl";
  const curriculumSubjects = isScienceBowl ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];

  if (isScienceBowl) {
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
              const emoji = subjectEmoji(item.name);
              return (
                <Link
                  key={item.slug}
                  className="subject-card"
                  href={practiceSubjectPath(competitionSlug, level, item.name)}
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

  const question = q
    ? await getQuestionById(competitionSlug, q, undefined, schoolLevel)
    : await getRandomQuestionByCompetition(competitionSlug, undefined, schoolLevel);

  return (
    <section className="section practice-page-section">
      <div className="container">
        {question ? (
          <PracticeSession
            initialQuestion={question}
            competitionSlug={competitionSlug}
            level={level}
          />
        ) : (
          <div className="empty">No questions are available yet.</div>
        )}
      </div>
    </section>
  );
}
