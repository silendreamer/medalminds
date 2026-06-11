import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatsCard } from "@/components/StatsCard";
import {
  getCompetitionBySlug,
  getContentCounts,
  getLessonsByCompetition,
  getQuestionsByCompetition,
  getTestsByCompetition,
  isCompetitionSlug
} from "@/lib/data";
import { buzzerPath, learningPath, practicePath, testsPath } from "@/lib/routes";

export default async function CompetitionPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const questions = await getQuestionsByCompetition(competitionSlug);
  const lessons = await getLessonsByCompetition(competitionSlug);
  const tests = await getTestsByCompetition(competitionSlug);
  const counts = await getContentCounts(competitionSlug);
  const isScienceBowl = competitionSlug === "science-bowl";

  return (
    <section className="section">
      <div className="container">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: competition.name }]} />
        <div className="hero-grid">
          <div>
            <span className="eyebrow">{competition.subdomain}.medalminds.com</span>
            <h1>{competition.name}</h1>
            <p className="subtitle">{competition.description}</p>
            <StatsCard {...counts} />
            <nav className="competition-section-nav" aria-label={`${competition.name} sections`}>
              <Link href={practicePath(competitionSlug)}>Practice Questions</Link>
              <Link href={learningPath(competitionSlug)}>Learning</Link>
              <Link href={testsPath(competitionSlug)}>Tests</Link>
              {isScienceBowl && <Link href={buzzerPath()}>Buzzer Arena</Link>}
            </nav>
          </div>
          <div className="card spacious stack">
            <h3>Featured practice question</h3>
            <p>{questions[0]?.prompt}</p>
            <span className="badge neutral">{questions[0]?.category}</span>
          </div>
        </div>

        <div className="section">
          <div className={`grid ${isScienceBowl ? "four" : ""}`}>
            <Link className="card spacious stack" href={practicePath(competitionSlug)}>
              <span className="eyebrow">Drill</span>
              <h2>Practice Questions</h2>
              <p>Filter by category, difficulty, and answer type.</p>
            </Link>
            <Link className="card spacious stack" href={learningPath(competitionSlug)}>
              <span className="eyebrow">Study</span>
              <h2>Learning</h2>
              <p>{lessons[0]?.title}</p>
            </Link>
            <Link className="card spacious stack" href={testsPath(competitionSlug)}>
              <span className="eyebrow">Simulate</span>
              <h2>Tests</h2>
              <p>{tests[0]?.title}</p>
            </Link>
            {isScienceBowl && (
              <Link className="card spacious stack" href={buzzerPath()}>
                <span className="eyebrow">Buzz</span>
                <h2>Buzzer Arena</h2>
                <p>Practice solo timing or run a two-team local toss-up and bonus round.</p>
              </Link>
            )}
          </div>
        </div>

        <div className="grid">
          <div className="card stack">
            <h3>Featured lesson</h3>
            <p>{lessons[0]?.summary}</p>
            <Link className="ghost-button" href={learningPath(competitionSlug)}>
              Browse lessons
            </Link>
          </div>
          <div className="card stack">
            <h3>Featured test</h3>
            <p>{tests[0]?.description}</p>
            <Link className="ghost-button" href={testsPath(competitionSlug)}>
              View tests
            </Link>
          </div>
          <div className="card stack">
            <h3>Categories</h3>
            <div className="badge-list">
              {competition.categories.map((category) => (
                <span className="badge neutral" key={category}>
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
