import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitionBySlug, getLessonBySlug, isCompetitionSlug } from "@/lib/data";
import { getNsbLessons } from "@/data/nsbQuestions";

export default async function LessonDetailPage({
  params
}: {
  params: Promise<{ competitionSlug: string; level: string; lessonId: string }>;
}) {
  const { competitionSlug, level, lessonId } = await params;
  if (!isCompetitionSlug(competitionSlug)) notFound();
  const competition = await getCompetitionBySlug(competitionSlug);
  const lesson = await getLessonBySlug(competitionSlug, lessonId);
  if (!competition || !lesson) notFound();

  // Find adjacent lessons in the same subtopic via raw NSB JSON
  let prevLesson: { slug: string; title: string } | null = null;
  let nextLesson: { slug: string; title: string } | null = null;
  let currentIndex = -1;
  let subtopicLessonsCount = 0;
  let subtopicLabel = lesson.category ?? "";

  if (competitionSlug === "science-bowl") {
    const rawLessons = await getNsbLessons();
    const rawCurrent = rawLessons.find((l: any) => l.slug === lessonId);
    if (rawCurrent) {
      subtopicLabel = rawCurrent.subtopic ?? rawCurrent.subject ?? "";
      const siblings = rawLessons.filter(
        (l: any) => l.topicSlug === rawCurrent.topicSlug && l.level === rawCurrent.level
      );
      currentIndex = siblings.findIndex((l: any) => l.slug === lessonId);
      subtopicLessonsCount = siblings.length;
      if (currentIndex > 0) prevLesson = siblings[currentIndex - 1];
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
            const lines = section.body
              .replace(/\n?---\s*$/, "")
              .trim()
              .split("\n")
              .map((s) => s.trim())
              .filter(Boolean)
              .map((l) => l.replace(/^\d+\.\s*/, ""));
            return (
              <div className={`lesson-section${isTossUp ? " lesson-section--no-border" : ""}`} key={section.heading}>
                {!isTossUp && <h2 className="lesson-section-heading">{section.heading}</h2>}
                {isTossUp ? (
                  <div style={{ display: "grid", gap: "10px" }}>
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
