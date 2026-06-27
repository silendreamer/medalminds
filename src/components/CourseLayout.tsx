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

  return (
    <div className="lesson-detail-layout">
      {/* Sticky left sidebar */}
      <aside className="lesson-sidebar" style={{ borderTop: `3px solid ${subjectColor}` }}>
        <div className="lesson-sidebar-header">
          <div className="lesson-sidebar-subject-icon" style={{ background: subjectColor }}>
            <span className="em">{emoji}</span>
          </div>
          <div>
            <h4>{tree.name}</h4>
            <span className="small muted">{tree.topics.reduce((sum, t) => sum + t.subTopics.reduce((sum2, st) => sum2 + st.lessons.length, 0), 0)} lessons · {tree.topics.length} topics</span>
          </div>
        </div>

        <nav className="lesson-sidebar-nav">
          {tree.topics.map((topic) => {
            const isOpen = openTopics.has(topic.id);
            const hasLessons = topic.subTopics.some((st) => st.lessons.length > 0);

            return (
              <div key={topic.id}>
                <button
                  className={`lesson-topic-btn${!hasLessons ? " dimmed" : ""}${isOpen ? " open" : ""}`}
                  onClick={() => hasLessons && toggleTopic(topic.id)}
                  disabled={!hasLessons}
                  style={{ color: isOpen && hasLessons ? subjectColor : undefined }}
                >
                  <ChevronRight open={isOpen} />
                  <span>{topic.name}</span>
                </button>

                {isOpen && (
                  <div className="lesson-subtopic-list">
                    {topic.subTopics.map((subTopic) => {
                      const stOpen = openSubTopics.has(subTopic.id);
                      const hasSubLessons = subTopic.lessons.length > 0;

                      return (
                        <div key={subTopic.id}>
                          <button
                            className={`lesson-subtopic-btn${!hasSubLessons ? " dimmed" : ""}${stOpen ? " open" : ""}`}
                            onClick={() => hasSubLessons && toggleSubTopic(subTopic.id)}
                            disabled={!hasSubLessons}
                            style={{ background: stOpen && hasSubLessons ? `${subjectColor}15` : undefined, color: stOpen && hasSubLessons ? subjectColor : undefined }}
                          >
                            <ChevronRight open={stOpen} />
                            <span>{subTopic.name}</span>
                            {hasSubLessons && (
                              <span className="lesson-chip" style={{ background: `${subjectColor}20`, color: subjectColor }}>{subTopic.lessons.length}</span>
                            )}
                          </button>

                          {stOpen && hasSubLessons && (
                            <div className="lesson-list">
                              {subTopic.lessons.map((lesson) => {
                                const isActive = lesson.slug === activeLessonSlug;
                                return (
                                  <Link
                                    key={lesson.id}
                                    href={lessonHref(lesson.slug)}
                                    className={`lesson-item${isActive ? " active" : ""}`}
                                    style={{
                                      background: isActive ? `${subjectColor}15` : undefined,
                                      borderLeft: isActive ? `3px solid ${subjectColor}` : undefined,
                                      paddingLeft: isActive ? "12px" : "15px"
                                    }}
                                  >
                                    <span style={{ color: isActive ? subjectColor : "#c2c7d0" }}>●</span>
                                    <span style={{ color: isActive ? subjectColor : "#667085" }}>{lesson.title}</span>
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

          {tree.unlinkedLessons.length > 0 && (
            <div className="lesson-unlinked">
              <div className="lesson-list">
                {tree.unlinkedLessons.map((lesson) => {
                  const isActive = lesson.slug === activeLessonSlug;
                  return (
                    <Link
                      key={lesson.id}
                      href={lessonHref(lesson.slug)}
                      className={`lesson-item${isActive ? " active" : ""}`}
                      style={{
                        background: isActive ? `${subjectColor}15` : undefined,
                        borderLeft: isActive ? `3px solid ${subjectColor}` : undefined,
                        paddingLeft: isActive ? "12px" : "15px"
                      }}
                    >
                      <span style={{ color: isActive ? subjectColor : "#c2c7d0" }}>●</span>
                      <span style={{ color: isActive ? subjectColor : "#667085" }}>{lesson.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Right pane — lesson content */}
      <main className="lesson-content">
        {activeLesson ? (
          <article className="lesson-article">
            <div className="lesson-article-header">
              <span className="chip" style={{ background: `${subjectColor}15`, color: subjectColor }}>
                {activeLesson.category}
              </span>
              <span className="small muted">Lesson 1 of 3</span>
            </div>

            <h1 style={{ marginBottom: "10px" }}>{activeLesson.title}</h1>
            <p className="muted" style={{ marginBottom: "24px" }}>{activeLesson.summary}</p>

            {activeLesson.keyConcepts.length > 0 && (
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
                <h3>Key concepts</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {activeLesson.keyConcepts.map((concept) => (
                    <div key={concept} style={{ display: "flex", gap: "10px" }}>
                      <span style={{ color: subjectColor }}>▸</span>
                      <p className="small"><b>{concept}</b></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLesson.contentSections.map((section, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                <p>{section.body}</p>
              </div>
            ))}

            {activeLesson.reviewQuestions.length > 0 && (
              <div className="card" style={{ background: "#f8f9fc", borderLeft: `3px solid ${subjectColor}` }}>
                <h4 style={{ marginBottom: "8px", color: subjectColor }}>⚡ Buzz-worthy fact</h4>
                <p className="small">{activeLesson.reviewQuestions[0]}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "26px", paddingTop: "20px", borderTop: "1px solid #eef0f3" }}>
              <span className="btn btn-outline btn-sm">← Subject overview</span>
              <span className="btn btn-primary">Next: Mendelian inheritance →</span>
            </div>
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
