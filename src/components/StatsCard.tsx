export function StatsCard({
  questions,
  lessons,
  tests
}: {
  questions: number;
  lessons: number;
  tests: number;
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
      <div className="stat">
        <strong>{tests}</strong>
        <span>tests</span>
      </div>
    </div>
  );
}
