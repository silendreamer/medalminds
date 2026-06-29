import Link from "next/link";
import type { Test } from "@/types";
import { testPath } from "@/lib/routes";

export function TestCard({ test }: { test: Test }) {
  return (
    <article className="card stack lesson-card">
      <div className="card-header">
        <div>
          <h3>{test.title}</h3>
          <p className="card-copy">{test.description}</p>
        </div>
        <span className="badge">{test.timeLimitMinutes} min</span>
      </div>
      <div className="badge-list">
        <span className="badge neutral">{test.level}</span>
        <span className="badge neutral">{test.questionIds.length} questions</span>
        {test.subjects.map((subject) => (
          <span className="badge neutral" key={subject}>
            {subject}
          </span>
        ))}
      </div>
      <Link className="button" href={testPath(test.competitionSlug, test.level?.toLowerCase().includes("high") ? "high-school" : "middle-school", test.slug)}>
        Start test
      </Link>
    </article>
  );
}
