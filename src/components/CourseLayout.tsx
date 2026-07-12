"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SubjectTree } from "@/lib/data";
import { parseLessonSectionLines, parseLessonTable } from "@/lib/lessonContent";
import type { CompetitionSlug, Lesson } from "@/types";
import { subjectEmoji } from "@/lib/subjects";

type Props = {
  tree: SubjectTree;
  activeLesson: Lesson | null;
  activeLessonSlug: string | null;
  competitionSlug: CompetitionSlug;
  activeTopic?: { topicName: string; subTopicName: string };
};

export function CourseLayout({ tree, activeLesson, activeLessonSlug, competitionSlug, activeTopic }: Props) {
  const pathname = usePathname();

  // Compute next lesson within the same subtopic
  let nextLesson: { slug: string; title: string } | null = null;
  if (activeLessonSlug) {
    for (const topic of tree.topics) {
      for (const subTopic of topic.subTopics) {
        const idx = subTopic.lessons.findIndex((l) => l.slug === activeLessonSlug);
        if (idx >= 0) {
          if (idx < subTopic.lessons.length - 1) nextLesson = subTopic.lessons[idx + 1];
          break;
        }
      }
    }
  }

  // Track visited lessons in localStorage, keyed by subject slug
  const storageKey = `visited-lessons-${tree.slug}`;
  const [visitedLessons, setVisitedLessons] = useState<Set<string>>(new Set());

  // Single open topic/subtopic at a time (accordion behavior)
  // Declared before the useEffect that calls setOpenTopicId/setOpenSubTopicId to
  // satisfy react-hooks/immutability (setter refs must be declared before use).
  const [openTopicId, setOpenTopicId] = useState<string | null>(() => {
    if (activeLessonSlug) {
      for (const topic of tree.topics) {
        for (const subTopic of topic.subTopics) {
          if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
            return topic.id;
          }
        }
      }
    }
    return null;
  });

  const [openSubTopicId, setOpenSubTopicId] = useState<string | null>(() => {
    if (activeLessonSlug) {
      for (const topic of tree.topics) {
        for (const subTopic of topic.subTopics) {
          if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
            return subTopic.id;
          }
        }
      }
    }
    return null;
  });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      const parsed: string[] = stored ? JSON.parse(stored) : [];
      setVisitedLessons(new Set(parsed));
    } catch { /* ignore */ }
  }, [storageKey]);
  useEffect(() => {
    if (!activeLessonSlug) return;
    // Mark as visited
    setVisitedLessons((prev) => {
      if (prev.has(activeLessonSlug)) return prev;
      const next = new Set(prev);
      next.add(activeLessonSlug);
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
    // Ensure the correct topic+subtopic are open when lesson changes (e.g. via Next button)
    for (const topic of tree.topics) {
      for (const subTopic of topic.subTopics) {
        if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
          setOpenTopicId(topic.id);
          setOpenSubTopicId(subTopic.id);
          return;
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLessonSlug, storageKey]);

  function toggleTopic(id: string) {
    setOpenTopicId((prev) => (prev === id ? null : id));
    setOpenSubTopicId(null); // collapse any open subtopic when switching topics
  }

  function toggleSubTopic(id: string) {
    setOpenSubTopicId((prev) => (prev === id ? null : id));
  }

  function lessonHref(lessonSlug: string) {
    return `${pathname}?lesson=${encodeURIComponent(lessonSlug)}`;
  }

  const emoji = subjectEmoji(tree.name);

  const subjectColorMap: Record<string, string> = {
    "Life Science": "#1f8a5b",
    "Physical Science": "#0066cc",
    "Earth and Space": "#4b5ba8",
    "Energy": "#c97c1c",
    "Math": "#1a2745"
  };
  const subjectColor = subjectColorMap[tree.name] || "#1a2745";

  const lessonCounts = tree.topics.reduce((sum, t) => sum + t.subTopics.reduce((sum2, st) => sum2 + st.lessons.length, 0), 0);
  const topicCount = tree.topics.length;

  return (
    <div className="course-two-pane">
      {/* Sidebar */}
      <aside className="course-sidebar">
        {/* Sidebar header */}
        <div className="course-sidebar-header">
          <div
            className="course-sidebar-icon"
            style={{ background: subjectColor }}
          >
            {emoji}
          </div>
          <div>
            <h4 className="course-sidebar-title">{tree.name}</h4>
            <span className="course-sidebar-meta">
              {lessonCounts} lessons · {topicCount} topics
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="course-sidebar-nav">
          {tree.topics.map((topic) => {
            const isOpen = openTopicId === topic.id;
            const hasLessons = topic.subTopics.some((st) => st.lessons.length > 0);
            const totalLessonsInTopic = topic.subTopics.reduce((sum, st) => sum + st.lessons.length, 0);

            return (
              <div key={topic.id}>
                {/* Topic row */}
                <button
                  onClick={() => hasLessons && toggleTopic(topic.id)}
                  disabled={!hasLessons}
                  className="course-topic-btn"
                  style={{
                    background: isOpen ? `${subjectColor}15` : undefined,
                    color: isOpen ? subjectColor : undefined,
                  }}
                >
                  <span>{topic.name}</span>
                  <span
                    className="course-topic-count"
                    style={isOpen ? {
                      background: `${subjectColor}25`,
                      color: subjectColor,
                    } : undefined}
                  >
                    {totalLessonsInTopic}
                  </span>
                </button>

                {isOpen && (
                  <div className="course-topic-body">
                    {topic.subTopics.map((subTopic) => {
                      const stOpen = openSubTopicId === subTopic.id;
                      const hasSubLessons = subTopic.lessons.length > 0;
                      const subTopicHasActive = subTopic.lessons.some((l) => l.slug === activeLessonSlug);

                      return (
                        <div key={subTopic.id}>
                          {/* Subtopic row */}
                          <button
                            onClick={() => hasSubLessons && toggleSubTopic(subTopic.id)}
                            disabled={!hasSubLessons}
                            className="course-subtopic-btn"
                            style={stOpen ? { color: subjectColor } : undefined}
                          >
                            <span>{subTopic.name}</span>
                            {hasSubLessons && (
                              <span className="course-subtopic-count">
                                {subTopic.lessons.length}
                              </span>
                            )}
                          </button>

                          {(stOpen || subTopicHasActive) && hasSubLessons && (
                            <div className="course-lesson-list">
                              {subTopic.lessons.map((lesson) => {
                                const isActive = lesson.slug === activeLessonSlug;
                                return (
                                  <Link
                                    key={lesson.id}
                                    href={lessonHref(lesson.slug)}
                                    className={`course-lesson-link${isActive ? " course-lesson-link--active" : ""}`}
                                    style={isActive ? {
                                      boxShadow: `inset 2px 0 0 ${subjectColor}`,
                                    } : undefined}
                                  >
                                    {(() => {
                                      const isVisited = visitedLessons.has(lesson.slug);
                                      if (isActive) return <span className="course-lesson-dot" style={{ color: subjectColor }}>●</span>;
                                      if (isVisited) return <span className="course-lesson-dot course-lesson-dot--visited">✓</span>;
                                      return <span className="course-lesson-dot course-lesson-dot--unvisited">○</span>;
                                    })()}
                                    {lesson.title}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main>
        {activeLesson ? (
          <article className="lesson-article">
            {/* Meta bar */}
            <div className="lesson-meta-bar">
              <span className="lesson-subtopic-label">{activeTopic?.subTopicName || activeLesson.subject}</span>
            </div>

            {/* Title block */}
            <div className="lesson-title-block">
              <h1 className="lesson-title">{activeLesson.title}</h1>
              <p className="lesson-summary">{activeLesson.summary}</p>
            </div>

            {/* Meta badges */}
            <div className="lesson-badges">
              <span className="lesson-badge">{activeLesson.level}</span>
              <span className="lesson-badge lesson-badge--neutral">{activeLesson.estimatedMinutes} min</span>
            </div>

            {/* Key concepts */}
            {activeLesson.keyConcepts.length > 0 && (
              <div className="lesson-concepts-box">
                <h3 className="lesson-concepts-heading">Key concepts</h3>
                <ul className="lesson-concepts-list">
                  {activeLesson.keyConcepts.map((concept) => (
                    <li key={concept}>{concept}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Content sections */}
            {activeLesson.contentSections.map((section) => {
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
                      {(lines.length > 1 ? lines : [section.body.replace(/\n?---\s*$/, "").trim()]).map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ol>
                  ) : (
                    <p className="lesson-section-body">{section.body}</p>
                  )}
                </div>
              );
            })}

            {/* Legacy reviewQuestions array — rendered as buzz-worthy callout */}
            {activeLesson.reviewQuestions.length > 0 && (
              <div className="lesson-buzz-fact">
                <div className="lesson-buzz-fact-heading">⚡ Buzz-worthy fact</div>
                <p className="lesson-buzz-fact-body">{activeLesson.reviewQuestions[0]}</p>
              </div>
            )}

            {/* Nav footer */}
            <div className="lesson-nav">
              <Link href={pathname.split("?")[0]} className="lesson-nav-btn lesson-nav-btn--secondary">
                ← Subject overview
              </Link>
              <div className="lesson-nav-right">
                {nextLesson && (
                  <Link href={lessonHref(nextLesson.slug)} className="lesson-nav-btn lesson-nav-btn--primary">
                    Next: {nextLesson.title} →
                  </Link>
                )}
              </div>
            </div>
          </article>
        ) : (
          <div className="course-empty-state">
            <span className="course-empty-state-eyebrow">Get started</span>
            <h2 className="course-empty-state-heading">Select a lesson from the left</h2>
            <p>Choose a topic from the left to start reading.</p>
          </div>
        )}
      </main>
    </div>
  );
}
