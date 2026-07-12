import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section not-found-section">
      <div className="container">
        <div className="stack not-found-inner">
          <span className="not-found-code">404</span>
          <h1>Page not found</h1>
          <p className="not-found-message">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link className="button" href="/">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
