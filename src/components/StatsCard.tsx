import { formatApproximateCount } from "@/lib/format";

export function StatsCard({
  questions,
  lessons
}: {
  questions: number;
  lessons: number;
}) {
  return (
    <div className="stat-row stats-card">
      <div className="stat">
        <strong>{formatApproximateCount(questions)}</strong>
        <span>practice questions</span>
      </div>
      <div className="stat">
        <strong>{formatApproximateCount(lessons)}</strong>
        <span>lessons</span>
      </div>
    </div>
  );
}
