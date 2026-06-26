"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubjectTree } from "@/lib/data";
import type { CompetitionSlug, Lesson } from "@/types";

type Props = {
  tree: SubjectTree;
  activeLesson: Lesson | null;
  activeLessonSlug: string | null;
  competitionSlug: CompetitionSlug;
};

function ChevronRight({ open }: { open: boolean }) {
  return (
    <svg
      className={`course-nav-chevron${open ? " open" : ""}`}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
    >
      <path d="M4 2.5L7.5 6 4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CourseLayout({ tree, activeLesson, activeLessonSlug, competitionSlug }: Props) {
  const pathname = usePathname();

  const [openTopics, setOpenTopics] = useState<Set<string>>(() => new Set());
  const [openSubTopics, setOpenSubTopics] = useState<Set<string>>(() => new Set());

  // Auto-expand the topic/subtopic containing the active lesson
  useEffect(() => {
    if (!activeLessonSlug) return;
    for (const topic of tree.topics) {
      for (const subTopic of topic.subTopics) {
        if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
          setOpenTopics((prev) => new Set([...prev, topic.id]));
          setOpenSubTopics((prev) => new Set([...prev, subTopic.id]));
          return;
        }
      }
    }
  }, [activeLessonSlug, tree]);

  function toggleTopic(id: string) {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSubTopic(id: string) {
    setOpenSubTopics((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function lessonHref(lessonSlug: string) {
    return `${pathname}?lesson=${encodeURIComponent(lessonSlug)}`;
  }

  return (
    <div className="course-layout">
      {/* Left nav */}
      <nav className="course-nav" aria-label="Course topics">
        <div className="course-nav-subject">
          <span className="eyebrow">{competitionSlug === "science-bowl" ? "Science Bowl" : competitionSlug}</span>
          <strong>{tree.name}</strong>
        </div>

        <ul className="course-nav-list">
          {tree.topics.map((topic) => {
            const isOpen = openTopics.has(topic.id);
            const hasLessons = topic.subTopics.some((st) => st.lessons.length > 0);

            return (
              <li key={topic.id}>
                <button
                  className={`course-nav-topic${!hasLessons ? " dimmed" : ""}`}
                  onClick={() => hasLessons && toggleTopic(topic.id)}
                  aria-expanded={isOpen}
                  disabled={!hasLessons}
                >
                  <ChevronRight open={isOpen} />
                  <span>{topic.name}</span>
                </button>

                {isOpen && (
                  <ul className="course-nav-subtopic-list">
                    {topic.subTopics.map((subTopic) => {
                      const stOpen = openSubTopics.has(subTopic.id);
                      const hasSubLessons = subTopic.lessons.length > 0;

                      return (
                        <li key={subTopic.id}>
                          <button
                            className={`course-nav-subtopic${!hasSubLessons ? " dimmed" : ""}`}
                            onClick={() => hasSubLessons && toggleSubTopic(subTopic.id)}
                            aria-expanded={stOpen}
                            disabled={!hasSubLessons}
                          >
                            <ChevronRight open={stOpen} />
                            <span>{subTopic.name}</span>
                            {hasSubLessons && (
                              <span className="course-nav-count">{subTopic.lessons.length}</span>
                            )}
                          </button>

                          {stOpen && hasSubLessons && (
                            <ul className="course-nav-lesson-list">
                              {subTopic.lessons.map((lesson) => {
                                const isActive = lesson.slug === activeLessonSlug;
                                return (
                                  <li key={lesson.id}>
                                    <Link
                                      href={lessonHref(lesson.slug)}
                                      className={`course-nav-lesson${isActive ? " active" : ""}`}
                                    >
                                      <span className="course-nav-dot" aria-hidden />
                                      <span>{lesson.title}</span>
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Right pane */}
      <main className="course-content">
        {activeLesson ? (
          <article className="stack">
            <div>
              <span className="eyebrow">{activeLesson.category}</span>
              <h1>{activeLesson.title}</h1>
              <p className="subtitle">{activeLesson.summary}</p>
            </div>
            <div className="badge-list">
              <span className="badge neutral">{activeLesson.level}</span>
              <span className="badge neutral">{activeLesson.estimatedMinutes} min</span>
            </div>

            {activeLesson.keyConcepts.length > 0 && (
              <section className="content-section stack">
                <h2>Key concepts</h2>
                <div className="badge-list">
                  {activeLesson.keyConcepts.map((concept) => (
                    <span className="badge neutral" key={concept}>{concept}</span>
                  ))}
                </div>
              </section>
            )}

            {activeLesson.contentSections.map((section) => (
              <section className="content-section stack" key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}

            {activeLesson.reviewQuestions.length > 0 && (
              <section className="content-section stack">
                <h2>Review questions</h2>
                {activeLesson.reviewQuestions.map((q) => (
                  <div className="feedback" key={q}>{q}</div>
                ))}
              </section>
            )}
          </article>
        ) : (
          <div className="course-content-empty">
            <span className="eyebrow">Get started</span>
            <h2>Select a lesson from the left</h2>
            <p className="subtitle">
              Topics expand to show subtopics. Subtopics with lessons show a count badge — click one to open it here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
