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
  activeTopic?: { topicName: string; subTopicName: string };
};

export function CourseLayout({ tree, activeLesson, activeLessonSlug, competitionSlug, activeTopic }: Props) {
  const pathname = usePathname();

  // Compute prev/next within the same subtopic
  let prevLesson: { slug: string; title: string } | null = null;
  let nextLesson: { slug: string; title: string } | null = null;
  if (activeLessonSlug) {
    for (const topic of tree.topics) {
      for (const subTopic of topic.subTopics) {
        const idx = subTopic.lessons.findIndex((l) => l.slug === activeLessonSlug);
        if (idx >= 0) {
          if (idx > 0) prevLesson = subTopic.lessons[idx - 1];
          if (idx < subTopic.lessons.length - 1) nextLesson = subTopic.lessons[idx + 1];
          break;
        }
      }
    }
  }

  // Track visited lessons in localStorage, keyed by subject slug
  const storageKey = `visited-lessons-${tree.slug}`;
  const [visitedLessons, setVisitedLessons] = useState<Set<string>>(new Set());
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

  // Single open topic/subtopic at a time (accordion behavior)
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

  const subjectEmojiMap: Record<string, string> = {
    "Life Science": "🧬",
    "Physical Science": "⚛️",
    "Earth & Space": "🌍",
    "Energy": "⚡",
    "Math": "∑"
  };
  const emoji = subjectEmojiMap[tree.name] || "📚";

  const subjectColorMap: Record<string, string> = {
    "Life Science": "#1f8a5b",
    "Physical Science": "#0066cc",
    "Earth & Space": "#4b5ba8",
    "Energy": "#c97c1c",
    "Math": "#1a2745"
  };
  const subjectColor = subjectColorMap[tree.name] || "#1a2745";

  const lessonCounts = tree.topics.reduce((sum, t) => sum + t.subTopics.reduce((sum2, st) => sum2 + st.lessons.length, 0), 0);
  const topicCount = tree.topics.length;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "26px", alignItems: "start" }}>
      {/* Sidebar */}
      <aside style={{ border: "1px solid #e7e9ee", borderRadius: "12px", overflow: "hidden", position: "sticky", top: "16px" }}>
        {/* Sidebar header */}
        <div style={{ padding: "18px", borderBottom: "1px solid #eef0f3", display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: subjectColor,
              color: "white",
              flexShrink: 0,
              fontSize: "22px",
              lineHeight: 1
            }}
          >
            {emoji}
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#1a2745" }}>{tree.name}</h4>
            <span style={{ display: "block", fontSize: "12px", color: "#667085" }}>
              {lessonCounts} lessons · {topicCount} topics
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ padding: "8px", maxHeight: "calc(100vh - 120px)", overflowY: "auto" }}>
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
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: isOpen ? `${subjectColor}15` : "transparent",
                    color: isOpen ? subjectColor : "#1a2745",
                    fontWeight: 600,
                    fontSize: "13.5px",
                    border: "none",
                    cursor: hasLessons ? "pointer" : "default",
                    textAlign: "left",
                    transition: "all 150ms ease"
                  }}
                >
                  <span>{topic.name}</span>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      padding: "2px 8px",
                      borderRadius: "999px",
                      background: isOpen ? `${subjectColor}25` : "#f1f3f7",
                      color: isOpen ? subjectColor : "#667085",
                      flexShrink: 0
                    }}
                  >
                    {totalLessonsInTopic}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ paddingBottom: "6px" }}>
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
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "8px 12px 8px 22px",
                              borderRadius: "7px",
                              background: "transparent",
                              color: stOpen ? subjectColor : "#667085",
                              fontWeight: 600,
                              fontSize: "12.5px",
                              border: "none",
                              cursor: hasSubLessons ? "pointer" : "default",
                              textAlign: "left",
                              transition: "color 150ms ease"
                            }}
                          >
                            <span>{subTopic.name}</span>
                            {hasSubLessons && (
                              <span style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                padding: "1px 6px",
                                borderRadius: "999px",
                                background: "#f1f3f7",
                                color: "#667085",
                                flexShrink: 0
                              }}>
                                {subTopic.lessons.length}
                              </span>
                            )}
                          </button>

                          {(stOpen || subTopicHasActive) && hasSubLessons && (
                            <div style={{ padding: "2px 10px 6px 22px" }}>
                              {subTopic.lessons.map((lesson) => {
                                const isActive = lesson.slug === activeLessonSlug;
                                return (
                                  <Link
                                    key={lesson.id}
                                    href={lessonHref(lesson.slug)}
                                    style={{
                                      display: "flex",
                                      alignItems: "flex-start",
                                      gap: "8px",
                                      padding: "7px 8px",
                                      borderRadius: "7px",
                                      background: isActive ? "#fff" : "transparent",
                                      fontSize: "13px",
                                      fontWeight: isActive ? 600 : 400,
                                      color: isActive ? "#1a2745" : "#667085",
                                      textDecoration: "none",
                                      boxShadow: isActive ? `inset 2px 0 0 ${subjectColor}` : "none",
                                      transition: "all 150ms ease",
                                      lineHeight: 1.4
                                    }}
                                  >
                                    {(() => {
                                      const isVisited = visitedLessons.has(lesson.slug);
                                      if (isActive) return <span style={{ color: subjectColor, fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>●</span>;
                                      if (isVisited) return <span style={{ color: "#22c55e", fontSize: "12px", marginTop: "1px", flexShrink: 0 }}>✓</span>;
                                      return <span style={{ color: "#c2c7d0", fontSize: "10px", marginTop: "3px", flexShrink: 0 }}>○</span>;
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
              <span className="lesson-subtopic-label">{activeTopic?.subTopicName || activeLesson.category}</span>
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
          <div style={{ color: "#667085", textAlign: "center", padding: "60px 40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#b8860b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Get started</span>
            <h2 style={{ color: "#1a2745", fontSize: "24px", fontWeight: 600, marginTop: "12px" }}>Select a lesson from the left</h2>
            <p style={{ color: "#667085" }}>Choose a topic from the left to start reading.</p>
          </div>
        )}
      </main>
    </div>
  );
}
