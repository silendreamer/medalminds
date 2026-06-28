"use client";

// Renders pre-processed question HTML — only <sup> and <sub> tags are ever written
// by the format-question-display script so dangerouslySetInnerHTML is safe here.
export function QuestionText({ html, className }: { html: string; className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
