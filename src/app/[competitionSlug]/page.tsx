import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StatsCard } from "@/components/StatsCard";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getContentCounts,
  getContentCountsBySchoolLevel,
  getContentCountsForSubject,
  isCompetitionSlug
} from "@/lib/data";
import { buzzerPath, learningPath, practicePath, testsPath } from "@/lib/routes";

export default async function CompetitionPage({
  params,
  searchParams
}: {
  params: Promise<{ competitionSlug: string }>;
  searchParams: Promise<{ subject?: string; level?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, level } = await searchParams;
  if (!isCompetitionSlug(competitionSlug)) notFound();

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  const isScienceBowl = competitionSlug === "science-bowl";
  const counts = isScienceBowl ? undefined : await getContentCounts(competitionSlug);
  const scienceBowlLevelCounts = isScienceBowl
    ? {
        middleSchool: await getContentCountsBySchoolLevel(competitionSlug, "MIDDLE_SCHOOL"),
        highSchool: await getContentCountsBySchoolLevel(competitionSlug, "HIGH_SCHOOL")
      }
    : undefined;
  const selectedLevel = isScienceBowl && (level === "middle-school" || level === "high-school") ? level : undefined;
  const selectedLevelLabel = selectedLevel === "middle-school" ? "Middle School" : selectedLevel === "high-school" ? "High School" : undefined;
  const selectedSchoolLevel =
    selectedLevel === "middle-school" ? "MIDDLE_SCHOOL" : selectedLevel === "high-school" ? "HIGH_SCHOOL" : undefined;
  const selectedSubject = subject && competition.categories.includes(subject) ? subject : undefined;
  const subjectCounts = await Promise.all(
    competition.categories.map(async (category) => ({
      category,
      counts: await getContentCountsForSubject(competitionSlug, category, selectedSchoolLevel)
    }))
  );
  const countsBySubject = new Map(subjectCounts.map((item) => [item.category, item.counts]));
  const levelQuery = selectedLevel ? `level=${selectedLevel}` : "";
  const subjectQuery = [levelQuery, selectedSubject ? `subject=${encodeURIComponent(selectedSubject)}` : ""].filter(Boolean).join("&");
  const actionQuery = subjectQuery ? `?${subjectQuery}` : "";

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level: selectedLevel,
            subject: selectedSubject
          })}
        />
        <div className="simple-heading competition-intro">
          <span className="eyebrow">{competition.subdomain}.medalminds.com</span>
          <h1>{competition.name}</h1>
          <p className="subtitle">{competition.description}</p>
          {counts && <StatsCard {...counts} />}
        </div>

        {isScienceBowl && !selectedLevel ? (
          <div>
            <div className="section-heading selection-heading">
              <h2>Choose your level</h2>
            </div>
            <div className="grid two">
              <Link className="card spacious stack" href={`/${competitionSlug}?level=middle-school`}>
                <span className="eyebrow">Science Bowl</span>
                <h2>Middle School</h2>
                <p>Grades 6-8 practice questions, quick tests, and lessons.</p>
                <StatsCard {...(scienceBowlLevelCounts?.middleSchool ?? { questions: 0, lessons: 0 })} />
              </Link>
              <Link className="card spacious stack" href={`/${competitionSlug}?level=high-school`}>
                <span className="eyebrow">Science Bowl</span>
                <h2>High School</h2>
                <p>Grades 9-12 practice questions, quick tests, and lessons.</p>
                <StatsCard {...(scienceBowlLevelCounts?.highSchool ?? { questions: 0, lessons: 0 })} />
              </Link>
            </div>
          </div>
        ) : !selectedSubject ? (
          <div>
            <div className="section-heading">
              <div>
                {selectedLevelLabel && <span className="eyebrow">{selectedLevelLabel}</span>}
                <h2>Choose a subject</h2>
              </div>
              {selectedLevel && (
                <Link className="ghost-button" href={`/${competitionSlug}`}>
                  Change level
                </Link>
              )}
            </div>
            <div className="grid">
              {competition.categories.map((category) => (
                <Link
                  className="card spacious stack"
                  href={`/${competitionSlug}?${[levelQuery, `subject=${encodeURIComponent(category)}`].filter(Boolean).join("&")}`}
                  key={category}
                >
                  <span className="eyebrow">Subject</span>
                  <h2>{category}</h2>
                  <p>Practice questions, lessons, and quick tests for this topic.</p>
                  <StatsCard {...(countsBySubject.get(category) ?? { questions: 0, lessons: 0 })} />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="section-heading selected-context">
              <div>
                <span className="eyebrow">Subject</span>
                <h2>{selectedSubject}</h2>
                {selectedLevelLabel && <p>{selectedLevelLabel}</p>}
              </div>
              <Link className="ghost-button" href={`/${competitionSlug}${selectedLevel ? `?level=${selectedLevel}` : ""}`}>
                Change subject
              </Link>
            </div>
            <div className={`grid ${isScienceBowl ? "four" : ""}`}>
              <Link className="card spacious stack" href={`${learningPath(competitionSlug)}${actionQuery}`}>
                <span className="eyebrow">Lessons</span>
                <h2>Learning</h2>
                <p>Browse lessons connected to this subject and level.</p>
              </Link>
              <Link className="card spacious stack" href={`${practicePath(competitionSlug)}${actionQuery}`}>
                <span className="eyebrow">Practice</span>
                <h2>Practice Questions</h2>
                <p>Get one random question, answer it, then review the answer and topic explanation.</p>
              </Link>
              <Link className="card spacious stack" href={`${testsPath(competitionSlug)}${actionQuery}`}>
                <span className="eyebrow">Tests</span>
                <h2>Quizzes</h2>
                <p>Choose 10, 25, or 50 multiple-choice questions and get your score at the end.</p>
              </Link>
              {isScienceBowl && (
                <Link className="card spacious stack" href={buzzerPath()}>
                <span className="eyebrow">Buzz</span>
                  <h2>Buzzer Practice</h2>
                  <p>Practice solo timing or run a two-team local toss-up and bonus round.</p>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
