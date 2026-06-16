import Link from "next/link";
import type { CompetitionSlug, CurriculumSubject, Lesson } from "@/types";
import { lessonPath } from "@/lib/routes";

const stopWords = new Set([
  "and",
  "the",
  "of",
  "in",
  "to",
  "vs",
  "with",
  "for",
  "on",
  "all",
  "basic",
  "advanced",
  "foundation",
  "intermediate",
  "overview"
]);

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((token) => token.length > 2 && !stopWords.has(token));
}

function scoreLessonForTopic(topicTitle: string, lesson: Lesson) {
  const topicTokens = tokenize(topicTitle);
  const lessonText = `${lesson.title} ${lesson.summary} ${lesson.keyConcepts.join(" ")}`.toLowerCase();

  let score = 0;
  for (const token of topicTokens) {
    if (lessonText.includes(token)) score += 2;
  }

  const normalizedTopic = topicTitle.toLowerCase();
  if (lesson.title.toLowerCase().includes(normalizedTopic)) score += 5;
  if (lesson.summary.toLowerCase().includes(normalizedTopic)) score += 3;

  return score;
}

function bestLessonsForTopic(topicTitle: string, lessons: Lesson[]) {
  return lessons
    .map((lesson) => ({ lesson, score: scoreLessonForTopic(topicTitle, lesson) }))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || left.lesson.title.localeCompare(right.lesson.title))
    .slice(0, 4)
    .map((item) => item.lesson);
}

export function CurriculumTopicExplorer({
  competitionSlug,
  lessons,
  subject
}: {
  competitionSlug: CompetitionSlug;
  lessons: Lesson[];
  subject: CurriculumSubject;
}) {
  return (
    <div className="curriculum-grade-stack">
      {subject.grades.map((grade) => (
        <section className="card spacious curriculum-grade-card" key={grade.key}>
          <div className="curriculum-grade-header">
            <span className="eyebrow">{subject.name}</span>
            <h2>{grade.label}</h2>
          </div>
          <div className="grid two curriculum-unit-grid">
            {grade.units.map((unit) => (
              <article className="curriculum-unit-card" key={`${grade.key}-${unit.title}`}>
                <h3>{unit.title}</h3>
                <div className="curriculum-topic-list">
                  {unit.topics.map((topic) => {
                    const matchedLessons = bestLessonsForTopic(topic.title, lessons);

                    return (
                      <details className="curriculum-topic-panel" key={topic.id}>
                        <summary className="curriculum-topic-row">
                          <span />
                          <div className="curriculum-topic-copy">
                            <p>{topic.title}</p>
                            <small>{matchedLessons.length ? `${matchedLessons.length} lesson${matchedLessons.length === 1 ? "" : "s"}` : "No linked lessons yet"}</small>
                          </div>
                        </summary>
                        <div className="curriculum-topic-drawer">
                          {matchedLessons.length ? (
                            <div className="curriculum-topic-lesson-list">
                              {matchedLessons.map((lesson) => (
                                <Link
                                  className="curriculum-topic-lesson-link"
                                  href={lessonPath(competitionSlug, lesson.slug)}
                                  key={lesson.id}
                                >
                                  <strong>{lesson.title}</strong>
                                  <p>{lesson.summary}</p>
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div className="curriculum-topic-empty">
                              No specific lesson is linked to this topic yet. Use the subject lesson list below for now.
                            </div>
                          )}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
