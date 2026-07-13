/** Card-grid skeleton shown while a dynamic route (hub/practice/learning/tests) renders. */
export function RouteSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <section className="section">
      <div className="container stack route-skeleton">
        <div className="skeleton-block skeleton-heading" />
        <div className="skeleton-block skeleton-subtitle" />
        <div className="skeleton-grid">
          {Array.from({ length: cards }).map((_, i) => (
            <div className="skeleton-block skeleton-card" key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
