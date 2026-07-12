"use client";

import { useState } from "react";
import { slugifySubject } from "@/lib/subjects";

interface SubjectOption {
  slug: string;
  name: string;
}

interface TestBuilderProps {
  competitionSlug: string;
  level: string;
  levelLabel: string;
  subjects: SubjectOption[];
  preselectedSubject?: string;
}

const SIZE_OPTIONS = [
  { value: "5", label: "5", unit: "questions" },
  { value: "10", label: "10", unit: "questions" },
  { value: "25", label: "25", unit: "questions" },
  { value: "full", label: "Full round", unit: "" },
];

const TIME_MAP: Record<string, string> = {
  "5": "~3 min",
  "10": "~6 min",
  "25": "~15 min",
  "full": "~30 min",
};

export function TestBuilder({
  competitionSlug,
  level,
  levelLabel,
  subjects,
  preselectedSubject,
}: TestBuilderProps) {
  const [subject, setSubject] = useState<string | null>(preselectedSubject ?? null);
  const [size, setSize] = useState<string | null>(null);

  const canStart = subject !== null && size !== null;
  const estimatedTime = size ? (TIME_MAP[size] ?? "~6 min") : "—";
  const questionCount = size === "full" ? "50" : (size ?? "—");

  function handleStart() {
    if (!canStart) return;
    const actualSize = size === "full" ? 50 : Number(size);
    const subjectSlug = slugifySubject(subject!);
    window.location.href = `/${competitionSlug}/${level}/tests/subject/${subjectSlug}?size=${actualSize}`;
  }

  return (
    <div className="tests-layout">
      {/* Main content panel */}
      <main className="tests-main">
        {/* Section 1: Subject */}
        <div className="tests-section">
          <h2 className="section-title">
            <span className="section-number">1</span>
            <span>Subject</span>
          </h2>
          {!subject && (
            <p className="tests-prompt">Please select a subject to continue.</p>
          )}
          <div className="subject-grid">
            {subjects.map((subj) => (
              <button
                key={subj.slug}
                className={`subject-chip${subject === subj.name ? " selected" : ""}`}
                onClick={() => setSubject(subject === subj.name ? null : subj.name)}
              >
                {subj.name}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Number of questions */}
        <div className="tests-section">
          <h2 className="section-title">
            <span className="section-number">2</span>
            <span>Number of questions</span>
          </h2>
          <div className="size-grid">
            {SIZE_OPTIONS.map(({ value, label, unit }) => (
              <button
                key={value}
                className={`size-chip${size === value ? " selected" : ""}`}
                onClick={() => setSize(size === value ? null : value)}
              >
                <span className="size-label">{label}</span>
                {unit && <span className="size-unit">{unit}</span>}
              </button>
            ))}
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
              <input type="checkbox" className="option-checkbox" />
              <span className="option-label">Timed mode</span>
            </label>
            <label className="option-item">
              <input type="checkbox" className="option-checkbox" />
              <span className="option-label">Show explanations after</span>
            </label>
            <label className="option-item">
              <input type="checkbox" className="option-checkbox" />
              <span className="option-label">Bonus questions</span>
            </label>
          </div>
        </div>
      </main>

      {/* Sticky sidebar */}
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
              <span className={`summary-value${!subject ? " summary-value--empty" : ""}`}>
                {subject ?? "Not selected"}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Questions</span>
              <span className={`summary-value${!size ? " summary-value--empty" : ""}`}>
                {questionCount}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Est. time</span>
              <span className="summary-value">{estimatedTime}</span>
            </div>
          </div>
          <button
            className={`button button-start-test${!canStart ? " button-start-test--disabled" : ""}`}
            onClick={handleStart}
            disabled={!canStart}
          >
            Start test
          </button>
          <p className="test-disclaimer">
            {!canStart
              ? (!subject ? "Select a subject first" : "Select number of questions")
              : "No account needed"}
          </p>
        </div>
      </aside>
    </div>
  );
}
