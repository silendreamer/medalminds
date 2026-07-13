import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitionBySlug, getLessonBySlug, getQuestionsForLesson, isCompetitionSlug } from "@/lib/data";
import { getNsbLessons, type NsbLesson } from "@/data/nsbQuestions";
import { QuestionText } from "@/components/QuestionText";
import { parseLessonSectionLines, parseLessonTable } from "@/lib/lessonContent";
import "@/app/practice-page.css";

// Lesson content is static per (competitionSlug, level, lessonId) and never
// changes per-request — cache the rendered page instead of re-reading the
// 24 MB question JSON + markdown file on every click. Pages are rendered
// on-demand on first visit (no generateStaticParams — 2,000+ lessons would
// bloat the build) and then reused for an hour.
export const revalidate = 3600;

export default async function LessonDetailPage({
  params
}: {
  params: Promise<{ competitionSlug: string; level: string; lessonId: string }>;
}) {
  const { competitionSlug, level, lessonId } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  const levelDisplay = level === "middle-school" ? "Middle School" : level === "high-school" ? "High School" : undefined;
  const lesson = await getLessonBySlug(competitionSlug, lessonId, levelDisplay);
  if (!competition || !lesson) notFound();

  const lessonQuestions = await getQuestionsForLesson(lesson.id, competitionSlug);

  // Find adjacent lessons in the same subtopic via raw NSB JSON
  let nextLesson: { slug: string; title: string } | null = null;
  let currentIndex = -1;
  let subtopicLessonsCount = 0;
  let subtopicLabel = lesson.subject ?? "";

  if (competitionSlug === "science-bowl") {
    const rawLessons = await getNsbLessons();
    const rawCurrent =
      (levelDisplay ? rawLessons.find((l: NsbLesson) => l.slug === lessonId && l.level === levelDisplay) : undefined)
      ?? rawLessons.find((l: NsbLesson) => l.slug === lessonId);
    if (rawCurrent) {
      subtopicLabel = rawCurrent.subtopic ?? rawCurrent.subject ?? "";
      const siblings = rawLessons.filter(
        (l: NsbLesson) => l.topicSlug === rawCurrent.topicSlug && l.level === rawCurrent.level
      );
      currentIndex = siblings.findIndex((l: NsbLesson) => l.slug === lessonId);
      subtopicLessonsCount = siblings.length;
      if (currentIndex >= 0 && currentIndex < siblings.length - 1) nextLesson = siblings[currentIndex + 1];
    }
  }
  // Parse review questions — body may be newline-separated "1. Q\n2. Q" or one string
  function parseReviewBody(body: string): string[] {
    // Strip trailing ---
    const cleaned = body.replace(/\n?---\s*$/, "").trim();
    // Split on newlines first (each numbered item is on its own line in the markdown)
    const lines = cleaned.split("\n").map(s => s.trim()).filter(Boolean);
    if (lines.length > 1) return lines.map(l => l.replace(/^\d+\.\s*/, ""));
    // Fallback: split on lookahead for "1. " pattern
    return cleaned.split(/(?=\d+\.\s)/).map(s => s.replace(/^\d+\.\s*/, "").trim()).filter(Boolean);
  }

  return (
    <section className="section lesson-detail-section">
      <div className="container">
        <article className="lesson-article">
          {/* Breadcrumb-style header */}
          <div className="lesson-meta-bar">
            <span className="lesson-subtopic-label">{subtopicLabel}</span>
            {currentIndex >= 0 && subtopicLessonsCount > 1 && (
              <span className="lesson-position">Lesson {currentIndex + 1} of {subtopicLessonsCount}</span>
            )}
          </div>

          {/* Title block */}
          <div className="lesson-title-block">
            <h1 className="lesson-title">{lesson.title}</h1>
            <p className="lesson-summary">{lesson.summary}</p>
          </div>

          {/* Meta badges */}
          <div className="lesson-badges">
            <span className="lesson-badge">{lesson.level}</span>
            <span className="lesson-badge lesson-badge--neutral">{lesson.estimatedMinutes} min</span>
          </div>

          {/* Key concepts box */}
          <div className="lesson-concepts-box">
            <h3 className="lesson-concepts-heading">Key concepts</h3>
            <ul className="lesson-concepts-list">
              {lesson.keyConcepts.map((concept) => (
                <li key={concept}>{concept}</li>
              ))}
            </ul>
          </div>

          {/* Content sections */}
          {lesson.contentSections.map((section) => {
            const isReview = /review questions?/i.test(section.heading);
            const isTossUp = /toss.?up|clue/i.test(section.heading);
            const parsedTable = isTossUp ? parseLessonTable(section.body) : null;
            const lines = parseLessonSectionLines(section.body);
            return (
              <div className={`lesson-section${isTossUp ? " lesson-section--no-border" : ""}`} key={section.heading}>
                {!isTossUp && <h2 className="lesson-section-heading">{section.heading}</h2>}
                {isTossUp && parsedTable ? (
                  <div>
                    <div className="lesson-clue-table-label">⚡ Science Bowl Clue</div>
                    <div className="lesson-clue-table-wrap">
                      <table className="lesson-clue-table">
                        <thead>
                          <tr>
                            {parsedTable.table.header.map((h) => <th key={h}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {parsedTable.table.rows.map((row, i) => (
                            <tr key={i}>
                              {row.map((cell, j) => <td key={j}>{cell}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : isTossUp ? (
                  <div className="lesson-clue-stack">
                    {lines.map((clue, i) => (
                      <div className="lesson-buzz-fact" key={i}>
                        <div className="lesson-buzz-fact-heading">⚡ Science Bowl Clue</div>
                        <p className="lesson-buzz-fact-body">{clue}</p>
                      </div>
                    ))}
                  </div>
                ) : isReview ? (
                  <ol className="lesson-review-list">
                    {parseReviewBody(section.body).map((q, i) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="lesson-section-body">{section.body}</p>
                )}
              </div>
            );
          })}

          {/* reviewQuestions array — rendered as buzz-worthy callout */}
          {lesson.reviewQuestions.length > 0 && (
            <div className="lesson-buzz-fact">
              <div className="lesson-buzz-fact-heading">⚡ Buzz-worthy fact</div>
              <p className="lesson-buzz-fact-body">{lesson.reviewQuestions[0]}</p>
            </div>
          )}

          {/* Practice questions for this lesson */}
          {lessonQuestions.length > 0 && (
            <div className="lesson-practice-questions">
              <h2 className="lesson-section-heading">Practice questions for this lesson</h2>
              {lessonQuestions.map((question) => (
                <div className="lesson-practice-question" key={question.id}>
                  <p className="question-prompt"><QuestionText html={question.prompt} /></p>
                  <p className="lesson-practice-answer">
                    Answer: <QuestionText html={question.correctAnswer} />
                  </p>
                  {question.explainAnswer && question.explainAnswer.length > 0 && (
                    <div className="ai-explanation">
                      <div className="ai-explain-card">
                        <div className="ai-explain-card-header">
                          <span className="ai-explain-card-title">Explanation</span>
                        </div>
                        {question.explainAnswer.length > 1 ? (
                          <ol className="ai-explain-steps">
                            {question.explainAnswer.map((step, i) => (
                              <li key={i} className="ai-explain-step">
                                <span className="ai-explain-step-number">{i + 1}</span>
                                <span className="ai-explain-step-text">{step}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="ai-explain-card-body">{question.explainAnswer[0]}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Navigation footer */}
          <div className="lesson-nav">
            <Link
              href={`/${competitionSlug}/${level}/learning`}
              className="lesson-nav-btn lesson-nav-btn--secondary"
            >
              ← Subject overview
            </Link>
            <div className="lesson-nav-right">
              {nextLesson && (
                <Link
                  href={`/${competitionSlug}/${level}/learning/${nextLesson.slug}`}
                  className="lesson-nav-btn lesson-nav-btn--primary"
                >
                  Next: {nextLesson.title} →
                </Link>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
