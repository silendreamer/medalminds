import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickTestRunner } from "@/components/QuickTestRunner";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import { getCompetitionBySlug, getRandomMultipleChoiceQuestions, isCompetitionSlug, type SchoolLevelFilter } from "@/lib/data";
import { competitionPath } from "@/lib/routes";
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
    title: `${levelLabel}${competition.name} ${subjectLabel}Quizzes & Tests | Medal Minds`,
    description: `Take quick ${competition.name} ${subjectLabel.toLowerCase()}tests with multiple-choice practice, scoring, and review for academic competition prep.`,
    path: `/${competitionSlug}/tests`,
    keywords: [`${competition.name} test`, `${competition.name} quiz`, `${competition.name} multiple choice`, subject ?? ""].filter(Boolean)
  });
}

export default async function TestsPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; size?: string; level?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, size, level } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const requestedSize = Number(size);
  const testSize = [10, 25, 50].includes(requestedSize) ? requestedSize : undefined;
  const schoolLevel: SchoolLevelFilter | undefined =
    competitionSlug === "science-bowl" && level === "middle-school"
      ? "MIDDLE_SCHOOL"
      : competitionSlug === "science-bowl" && level === "high-school"
        ? "HIGH_SCHOOL"
        : undefined;
  const questions = testSize ? await getRandomMultipleChoiceQuestions(competitionSlug, subject ?? null, testSize, schoolLevel) : [];
  const levelQuery = level ? `level=${level}` : "";
  const subjectQuery = subject ? `subject=${encodeURIComponent(subject)}` : "";

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            action: "Tests",
            subject,
            current: subject ? undefined : "Tests"
          })}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{subject ?? "Multiple-choice"} Test</h1>
          </div>
        </div>
        {!testSize ? (
          <div className="grid">
            {[10, 25, 50].map((option) => (
              <Link
                className="card spacious stack"
                href={`${competitionPath(competitionSlug)}/tests?${[levelQuery, subjectQuery, `size=${option}`].filter(Boolean).join("&")}`}
                key={option}
              >
                <span className="eyebrow">Quick test</span>
                <h2>{option} questions</h2>
                <p>Multiple choice only. Score and answers appear at the end.</p>
              </Link>
            ))}
          </div>
        ) : (
          <QuickTestRunner questions={questions} />
        )}
      </div>
    </section>
  );
}
