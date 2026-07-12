import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuickTestRunner } from "@/components/QuickTestRunner";
import { TestBuilder } from "@/components/TestBuilder";
import {
  getCompetitionBySlug,
  getRandomMultipleChoiceQuestions,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  getScienceBowlMiddleSchoolSubjectBySlug,
  isCompetitionSlug,
  type SchoolLevelFilter,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { parseSchoolLevel } from "@/lib/levels";
import "@/app/tests-page.css";

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
    title: `${levelLabel}${competition.name} ${subjectLabel}Quizzes & Tests | Medal Minds`,
    description: `Take quick ${competition.name} ${subjectLabel.toLowerCase()}tests with multiple-choice practice, scoring, and review for academic competition prep.`,
    path: `/${competitionSlug}/${level}/tests/subject/${subjectSlug}`,
    keywords: [`${competition.name} test`, `${competition.name} quiz`, `${competition.name} multiple choice`, subject?.name ?? ""].filter(Boolean)
  });
}

export default async function TestsSubjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ competitionSlug: string; level: string; subjectSlug: string }>;
  searchParams: Promise<{ size?: string }>;
}) {
  const { competitionSlug, level, subjectSlug } = await params;
  const { size } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const subject = getScienceBowlMiddleSchoolSubjectBySlug(subjectSlug);
  if (!subject) notFound();

  const requestedSize = Number(size);
  const testSize = [5, 10, 25, 50].includes(requestedSize) ? requestedSize : undefined;
  const schoolLevel: SchoolLevelFilter | undefined = parseSchoolLevel(level);

  const curriculumSubjects = await getScienceBowlMiddleSchoolCurriculumSubjects();
  const quizQuestions = testSize
    ? await getRandomMultipleChoiceQuestions(competitionSlug, subject.name, testSize, schoolLevel)
    : [];

  const levelLabel = level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : "Middle School";

  if (!testSize) {
    return (
      <section className="section tests-page-section">
        <div className="container stack">
          <div className="tests-page-hero">
            <div>
              <span className="eyebrow">{competition.name}</span>
              <h1>Build a {subject.name} test</h1>
            </div>
          </div>
          <TestBuilder
            competitionSlug={competitionSlug}
            level={level}
            levelLabel={levelLabel}
            subjects={curriculumSubjects.slice(0, 6)}
            preselectedSubject={subject.name}
          />
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
            <h1>{subject.name} Test</h1>
          </div>
        </div>
        <QuickTestRunner questions={quizQuestions} />
      </div>
    </section>
  );
}
