export function StatsCard({
  questions,
  lessons
}: {
  questions: number;
  lessons: number;
}) {
  return (
    <div className="stat-row">
      <div className="stat">
        <strong>{questions}</strong>
        <span>practice questions</span>
      </div>
      <div className="stat">
        <strong>{lessons}</strong>
        <span>lessons</span>
      </div>
    </div>
  );
}
