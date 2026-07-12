import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PracticeSession } from "@/components/PracticeSession";
import {
  getCompetitionBySlug,
  getQuestionById,
  getRandomQuestionByCompetition,
  getScienceBowlMiddleSchoolSubjectBySlug,
  isCompetitionSlug,
  type SchoolLevelFilter,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { parseSchoolLevel } from "@/lib/levels";
import "@/app/practice-page.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitionSlug: string; level: string; subjectSlug: string }>;
}): Promise<Metadata> {
  const { competitionSlug, level, subjectSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) return {};
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) return {};
  const subject = getScienceBowlMiddleSchoolSubjectBySlug(subjectSlug);
  const levelLabel = level === "middle-school" ? "Middle School " : "";
  const subjectLabel = subject ? `${subject.name} ` : "";

  return buildMetadata({
    title: `${levelLabel}${competition.name} ${subjectLabel}Practice Questions | Medal Minds`,
    description: `Practice ${levelLabel.toLowerCase()}${competition.name} ${subjectLabel.toLowerCase()}questions with instant review, explanations, and competition-focused study links.`,
    path: `/${competitionSlug}/${level}/practice/${subjectSlug}`,
    keywords: [`${competition.name} practice questions`, `${competition.name} ${subjectLabel}practice`, subject?.name ?? ""].filter(Boolean)
  });
}

export default async function PracticeSubjectPage({
  params,
}: {
  params: Promise<{ competitionSlug: string; level: string; subjectSlug: string }>;
}) {
  const { competitionSlug, level, subjectSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const subject = getScienceBowlMiddleSchoolSubjectBySlug(subjectSlug);
  if (!subject) notFound();

  const schoolLevel: SchoolLevelFilter | undefined = parseSchoolLevel(level);

  const question = await getRandomQuestionByCompetition(competitionSlug, subject.name, schoolLevel);

  return (
    <section className="section practice-page-section">
      <div className="container">
        {question ? (
          <PracticeSession
            initialQuestion={question}
            competitionSlug={competitionSlug}
            level={level}
            subjectSlug={subjectSlug}
            subject={subject.name}
          />
        ) : (
          <div className="empty">No questions are available yet.</div>
        )}
      </div>
    </section>
  );
}
