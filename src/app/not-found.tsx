import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section" style={{ padding: "var(--space-xl) 0" }}>
      <div className="container">
        <div className="stack" style={{ alignItems: "center", textAlign: "center", maxWidth: "480px", margin: "0 auto" }}>
          <span style={{ fontSize: "4rem", fontWeight: 800, color: "var(--navy)", lineHeight: 1, fontFamily: "var(--font-poppins), Arial, sans-serif" }}>404</span>
          <h1 style={{ marginTop: "var(--space-sm)" }}>Page not found</h1>
          <p style={{ color: "var(--text-secondary)", marginTop: "var(--space-xs)" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link className="button" href="/" style={{ marginTop: "var(--space-md)" }}>
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
