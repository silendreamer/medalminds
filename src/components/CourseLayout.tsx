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

  const [openTopics, setOpenTopics] = useState<Set<string>>(() => {
    if (activeLessonSlug) {
      const topics = new Set<string>();
      for (const topic of tree.topics) {
        for (const subTopic of topic.subTopics) {
          if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
            topics.add(topic.id);
          }
        }
      }
      return topics;
    }
    return new Set();
  });

  const [openSubTopics, setOpenSubTopics] = useState<Set<string>>(() => {
    if (activeLessonSlug) {
      const subTopics = new Set<string>();
      for (const topic of tree.topics) {
        for (const subTopic of topic.subTopics) {
          if (subTopic.lessons.some((l) => l.slug === activeLessonSlug)) {
            subTopics.add(subTopic.id);
          }
        }
      }
      return subTopics;
    }
    return new Set();
  });

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
        <nav style={{ padding: "8px" }}>
          {tree.topics.map((topic) => {
            const isOpen = openTopics.has(topic.id);
            const hasLessons = topic.subTopics.some((st) => st.lessons.length > 0);
            const totalLessonsInTopic = topic.subTopics.reduce((sum, st) => sum + st.lessons.length, 0);

            return (
              <div key={topic.id}>
                <button
                  onClick={() => hasLessons && toggleTopic(topic.id)}
                  disabled={!hasLessons}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "11px 12px",
                    borderRadius: "8px",
                    background: isOpen ? `${subjectColor}15` : "transparent",
                    color: isOpen ? subjectColor : "#1a2745",
                    fontWeight: 600,
                    fontSize: "14px",
                    border: "none",
                    cursor: hasLessons ? "pointer" : "default",
                    transition: "all 150ms ease"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 160ms ease", display: "inline-block" }}>▼</span>
                    {topic.name}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "2px 7px",
                      borderRadius: "999px",
                      background: `${subjectColor}20`,
                      color: subjectColor
                    }}
                  >
                    {totalLessonsInTopic}
                  </span>
                </button>

                {isOpen && (
                  <div style={{ paddingTop: "4px", paddingBottom: "8px" }}>
                    {topic.subTopics.map((subTopic) => {
                      const stOpen = openSubTopics.has(subTopic.id);
                      const hasSubLessons = subTopic.lessons.length > 0;

                      return (
                        <div key={subTopic.id}>
                          <button
                            onClick={() => hasSubLessons && toggleSubTopic(subTopic.id)}
                            disabled={!hasSubLessons}
                            style={{
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "11px 12px",
                              paddingLeft: "26px",
                              borderRadius: "8px",
                              background: stOpen ? `${subjectColor}15` : "transparent",
                              color: stOpen ? subjectColor : "#1a2745",
                              fontWeight: 600,
                              fontSize: "14px",
                              border: "none",
                              cursor: hasSubLessons ? "pointer" : "default",
                              transition: "all 150ms ease"
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              {hasSubLessons && (
                                <span style={{ transform: stOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 160ms ease", display: "inline-block", fontSize: "12px" }}>▼</span>
                              )}
                              {subTopic.name}
                            </span>
                            {hasSubLessons && (
                              <span
                                style={{
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  padding: "2px 7px",
                                  borderRadius: "999px",
                                  background: `${subjectColor}20`,
                                  color: subjectColor
                                }}
                              >
                                {subTopic.lessons.length}
                              </span>
                            )}
                          </button>

                          {stOpen && hasSubLessons && (
                            <div style={{ padding: "4px 14px 8px" }}>
                              {subTopic.lessons.map((lesson) => {
                                const isActive = lesson.slug === activeLessonSlug;
                                return (
                                  <Link
                                    key={lesson.id}
                                    href={lessonHref(lesson.slug)}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "9px",
                                      padding: "8px 8px",
                                      borderRadius: "7px",
                                      background: isActive ? "#fff" : "transparent",
                                      fontSize: "13.5px",
                                      fontWeight: 600,
                                      color: isActive ? "#1a2745" : "#667085",
                                      textDecoration: "none",
                                      boxShadow: isActive ? "inset 2px 0 0 " + subjectColor : "none",
                                      transition: "all 150ms ease"
                                    }}
                                  >
                                    <span style={{ color: isActive ? subjectColor : "#c2c7d0" }}>●</span>
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
          <>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: `${subjectColor}15`,
                  color: subjectColor
                }}
              >
                {activeTopic?.subTopicName || activeLesson.category}
              </span>
              <span style={{ fontSize: "13px", color: "#667085" }}>Lesson 1 of 3</span>
            </div>

            <h1 style={{ fontSize: "32px", marginBottom: "10px", marginTop: 0, color: "#1a2745" }}>{activeLesson.title}</h1>
            <p style={{ color: "#667085", marginBottom: "24px" }}>{activeLesson.summary}</p>

            {activeLesson.keyConcepts.length > 0 && (
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #e7e9ee",
                  borderRadius: "12px",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  marginBottom: "20px"
                }}
              >
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#1a2745" }}>Key concepts</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  {activeLesson.keyConcepts.map((concept) => (
                    <div key={concept} style={{ display: "flex", gap: "10px" }}>
                      <span style={{ color: subjectColor, flexShrink: 0 }}>▸</span>
                      <p style={{ margin: 0, fontSize: "13px", color: "#667085", lineHeight: 1.6 }}>
                        {concept}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeLesson.contentSections.map((section, idx) => (
              <div key={idx} style={{ marginBottom: "24px" }}>
                {idx === 0 && (
                  <h2 style={{ margin: "0 0 14px 0", fontSize: "24px", fontWeight: 600, color: "#1a2745" }}>{section.heading}</h2>
                )}
                <p style={{ margin: 0, color: "#667085", lineHeight: 1.6 }}>{section.body}</p>
              </div>
            ))}

            {activeLesson.reviewQuestions.length > 0 && (
              <div
                style={{
                  background: "#f8f9fc",
                  border: "1px solid #e7e9ee",
                  borderLeft: "3px solid #b8860b",
                  borderRadius: "12px",
                  padding: "22px",
                  marginBottom: "26px"
                }}
              >
                <h4 style={{ margin: "0 0 8px 0", color: "#b8860b", fontSize: "16px", fontWeight: 600 }}>⚡ Buzz-worthy fact</h4>
                <p style={{ margin: 0, fontSize: "13px", color: "#667085", lineHeight: 1.6 }}>{activeLesson.reviewQuestions[0]}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "26px", paddingTop: "20px", borderTop: "1px solid #eef0f3" }}>
              <Link
                href={pathname.split("?")[0]}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  minHeight: "38px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: "#fff",
                  color: "#1a2745",
                  border: "1px solid #d6dae2",
                  borderRadius: "8px",
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "all 150ms ease"
                }}
              >
                ← Subject overview
              </Link>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  minHeight: "38px",
                  fontSize: "13px",
                  fontWeight: 600,
                  background: "#1a2745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 150ms ease"
                }}
              >
                Next: Mendelian inheritance →
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: "#667085", textAlign: "center", padding: "60px 40px" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#b8860b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Get started</span>
            <h2 style={{ color: "#1a2745", fontSize: "24px", fontWeight: 600, marginTop: "12px" }}>Select a lesson from the left</h2>
            <p style={{ color: "#667085" }}>Topics expand to show subtopics. Subtopics with lessons show a count badge — click one to open it here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
