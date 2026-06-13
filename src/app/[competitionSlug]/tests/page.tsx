import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickTestRunner } from "@/components/QuickTestRunner";
import { getCompetitionBySlug, getRandomMultipleChoiceQuestions, isCompetitionSlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export const dynamic = "force-dynamic";

export default async function TestsPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; size?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, size } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const requestedSize = Number(size);
  const testSize = [10, 25, 50].includes(requestedSize) ? requestedSize : undefined;
  const questions = testSize ? await getRandomMultipleChoiceQuestions(competitionSlug, subject ?? null, testSize) : [];
  const subjectQuery = subject ? `subject=${encodeURIComponent(subject)}` : "";

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: `${competitionPath(competitionSlug)}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` },
            { label: "Tests" }
          ]}
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
                href={`${competitionPath(competitionSlug)}/tests?${[subjectQuery, `size=${option}`].filter(Boolean).join("&")}`}
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
