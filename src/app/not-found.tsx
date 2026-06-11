import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty">
          <span className="eyebrow">Not found</span>
          <h1>That prep page is not available.</h1>
          <p>Choose one of the active competition sections from the homepage.</p>
          <br />
          <Link className="button" href="/">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
