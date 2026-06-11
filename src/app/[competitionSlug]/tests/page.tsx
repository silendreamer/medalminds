import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TestCard } from "@/components/TestCard";
import { getCompetitionBySlug, getTestsByCompetition, isCompetitionSlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";

export default async function TestsPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();
  const tests = await getTestsByCompetition(competitionSlug);

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath(competitionSlug) },
            { label: "Tests" }
          ]}
        />
        <div className="section-heading">
          <div>
            <span className="eyebrow">{competition.name}</span>
            <h1>Tests</h1>
          </div>
        </div>
        {tests.length ? (
          <div className="grid two">
            {tests.map((test) => (
              <TestCard test={test} key={test.id} />
            ))}
          </div>
        ) : (
          <div className="empty">No tests are available yet.</div>
        )}
      </div>
    </section>
  );
}
