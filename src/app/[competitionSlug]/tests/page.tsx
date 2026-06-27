import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { QuickTestRunner } from "@/components/QuickTestRunner";
import { buildStudyBreadcrumbs } from "@/lib/breadcrumbs";
import {
  getCompetitionBySlug,
  getContentCountsForSubject,
  getRandomMultipleChoiceQuestions,
  getScienceBowlMiddleSchoolCurriculumSubjects,
  isCompetitionSlug,
  type SchoolLevelFilter
} from "@/lib/data";
import { formatApproximateCount } from "@/lib/format";
import { competitionPath, testsPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";
import "@/app/tests-page.css";

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
  searchParams: Promise<{ subject?: string; size?: string; level?: string; questions?: string; timed?: string; explanations?: string; bonus?: string }>;
}) {
  const { competitionSlug } = await params;
  const { subject, size, level, questions, timed, explanations, bonus } = await searchParams;
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
  const isScienceBowlMiddleSchool = competitionSlug === "science-bowl" && schoolLevel === "MIDDLE_SCHOOL";
  const curriculumSubjects = isScienceBowlMiddleSchool ? await getScienceBowlMiddleSchoolCurriculumSubjects() : [];
  const quizQuestions = testSize ? await getRandomMultipleChoiceQuestions(competitionSlug, subject ?? null, testSize, schoolLevel) : [];
  const levelQuery = level ? `level=${level}` : "";
  const subjectQuery = subject ? `subject=${encodeURIComponent(subject)}` : "";

  if (isScienceBowlMiddleSchool && !subject) {
    const subjectCounts = await Promise.all(
      curriculumSubjects.map(async (item) => ({
        subject: item,
        counts: await getContentCountsForSubject(competitionSlug, item.name, schoolLevel)
      }))
    );

    return (
      <section className="section">
        <div className="container stack">
          <Breadcrumbs
            items={buildStudyBreadcrumbs({
              competitionSlug,
              competitionName: competition.name,
              level,
              action: "Tests",
              current: "Tests"
            })}
          />
          <div className="simple-heading">
            <span className="eyebrow">{competition.name}</span>
            <h1>Middle School Tests</h1>
            <p className="subtitle">Pick a subject to start a multiple-choice quiz.</p>
          </div>
          <div className="grid two curriculum-subject-grid">
            {subjectCounts.map(({ subject: item, counts }) => (
              <Link
                className="card spacious stack curriculum-subject-card"
                href={`${testsPath(competitionSlug)}?level=middle-school&subject=${encodeURIComponent(item.name)}`}
                key={item.slug}
              >
                <div className="stack compact">
                  <span className="eyebrow">Science Bowl middle school</span>
                  <h2>{item.name}</h2>
                  <p>{item.shortDescription}</p>
                </div>
                <div className="mini-stat-list">
                  <span>
                    <strong>{formatApproximateCount(counts.questions)}</strong>
                    <small>Questions</small>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show test builder UI when no testSize is selected
  if (!testSize) {
    const selectedQuestions = questions || "10";
    const estimatedTime = {
      "5": "~3 min",
      "10": "~6 min",
      "20": "~12 min",
      "full": "~25 min"
    }[selectedQuestions] || "~6 min";

    const levelLabel = level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : "Middle School";

    return (
      <section className="section tests-page-section">
        <div className="container stack">
          <Breadcrumbs
            items={buildStudyBreadcrumbs({
              competitionSlug,
              competitionName: competition.name,
              level,
              action: "Tests",
              actionHref: `${testsPath(competitionSlug)}${level ? `?level=${level}` : ""}`,
              subject,
              current: subject ? undefined : "Tests"
            })}
          />

          {/* Hero section with level toggle */}
          <div className="tests-page-hero">
            <div>
              <span className="eyebrow">{competition.name}</span>
              <h1>Build a timed test</h1>
            </div>
            <div className="level-toggle-wrapper">
              <span className="level-toggle-label">Division</span>
              <div className="level-toggle">
                <Link
                  href={`${testsPath(competitionSlug)}?level=middle-school${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`}
                  className={`level-toggle-btn ${level === "middle-school" || !level ? "active" : ""}`}
                >
                  Middle School
                </Link>
                <Link
                  href={`${testsPath(competitionSlug)}?level=high-school${subject ? `&subject=${encodeURIComponent(subject)}` : ""}`}
                  className={`level-toggle-btn ${level === "high-school" ? "active" : ""}`}
                >
                  High School
                </Link>
              </div>
            </div>
          </div>

          {/* Main layout with sidebar */}
          <div className="tests-layout">
            {/* Main content panel */}
            <main className="tests-main">
              {/* Section 1: Subject Selection */}
              <div className="tests-section">
                <h2 className="section-title">
                  <span className="section-number">1</span>
                  <span>Subject</span>
                </h2>
                <div className="subject-grid">
                  {isScienceBowlMiddleSchool && curriculumSubjects.length > 0 ? (
                    <>
                      {curriculumSubjects.slice(0, 6).map((subj) => (
                        <Link
                          key={subj.slug}
                          href={`${testsPath(competitionSlug)}?level=${level || "middle-school"}&subject=${encodeURIComponent(subj.name)}`}
                          className={`subject-chip ${subject === subj.name ? "selected" : ""}`}
                        >
                          {subj.name}
                        </Link>
                      ))}
                      <Link
                        href={`${testsPath(competitionSlug)}?level=${level || "middle-school"}`}
                        className={`subject-chip ${!subject ? "selected" : ""}`}
                      >
                        All subjects
                      </Link>
                    </>
                  ) : (
                    <p style={{ color: "#667085", fontSize: "14px" }}>Subject selection unavailable</p>
                  )}
                </div>
              </div>

              {/* Section 2: Number of Questions */}
              <div className="tests-section">
                <h2 className="section-title">
                  <span className="section-number">2</span>
                  <span>Number of questions</span>
                </h2>
                <div className="size-grid">
                  {[
                    { value: "5", label: "5" },
                    { value: "10", label: "10" },
                    { value: "20", label: "20" },
                    { value: "full", label: "Full round" }
                  ].map(({ value, label }) => {
                    const actualSize = value === "full" ? 50 : Number(value);
                    return (
                      <Link
                        key={value}
                        href={`${testsPath(competitionSlug)}?${[
                          level ? `level=${level}` : "",
                          subject ? `subject=${encodeURIComponent(subject)}` : "",
                          `size=${actualSize}`
                        ]
                          .filter(Boolean)
                          .join("&")}`}
                        className={`size-chip ${selectedQuestions === value ? "selected" : ""}`}
                      >
                        <span className="size-label">{label}</span>
                        {value !== "full" && <span className="size-unit">questions</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Section 3: Options */}
              <div className="tests-section">
                <h2 className="section-title">
                  <span className="section-number">3</span>
                  <span>Options</span>
                </h2>
                <div className="options-list">
                  <label className="option-item">
                    <input
                      type="checkbox"
                      defaultChecked={timed === "true"}
                      className="option-checkbox"
                    />
                    <span className="option-label">Timed mode</span>
                  </label>
                  <label className="option-item">
                    <input
                      type="checkbox"
                      defaultChecked={explanations === "true"}
                      className="option-checkbox"
                    />
                    <span className="option-label">Show explanations after</span>
                  </label>
                  <label className="option-item">
                    <input
                      type="checkbox"
                      defaultChecked={bonus === "true"}
                      className="option-checkbox"
                    />
                    <span className="option-label">Bonus questions</span>
                  </label>
                </div>
              </div>
            </main>

            {/* Sticky sidebar: Your test card */}
            <aside className="tests-sidebar">
              <div className="your-test-card">
                <h3>Your test</h3>
                <div className="test-summary">
                  <div className="summary-row">
                    <span className="summary-label">Division</span>
                    <span className="summary-value">{levelLabel}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Subject</span>
                    <span className="summary-value">{subject || "All subjects"}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Questions</span>
                    <span className="summary-value">{selectedQuestions === "full" ? "50" : selectedQuestions}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Est. time</span>
                    <span className="summary-value">{estimatedTime}</span>
                  </div>
                </div>
                <Link
                  href={`${testsPath(competitionSlug)}?${[
                    level ? `level=${level}` : "",
                    subject ? `subject=${encodeURIComponent(subject)}` : "",
                    `size=${selectedQuestions === "full" ? 50 : selectedQuestions}`
                  ]
                    .filter(Boolean)
                    .join("&")}`}
                  className="button button-start-test"
                >
                  Start test
                </Link>
                <p className="test-disclaimer">No account needed</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container stack">
        <Breadcrumbs
          items={buildStudyBreadcrumbs({
            competitionSlug,
            competitionName: competition.name,
            level,
            action: "Tests",
            actionHref: `${testsPath(competitionSlug)}${level ? `?level=${level}` : ""}`,
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
        <QuickTestRunner questions={quizQuestions} />
      </div>
    </section>
  );
}
