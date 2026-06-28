import { notFound } from "next/navigation";
import { TestRunner } from "@/components/TestRunner";
import { getCompetitionBySlug, getQuestionsForTest, getTestBySlug, isCompetitionSlug } from "@/lib/data";

export default async function TestDetailPage({
  params
}: {
  params: Promise<{ competitionSlug: string; level: string; testId: string }>;
}) {
  const { competitionSlug, testId } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  const test = await getTestBySlug(competitionSlug, testId);
  if (!competition || !test) notFound();

  const questions = await getQuestionsForTest(test.questionIds);

  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>{test.title}</h1>
            <p>{test.description}</p>
          </div>
        </div>
        {questions.length ? <TestRunner test={test} questions={questions} /> : <div className="empty">This test has no questions.</div>}
      </div>
    </section>
  );
}
