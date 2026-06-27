import Link from "next/link";
import { MedalMark } from "@/components/MedalMark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                <MedalMark size={32} />
              </span>
              <strong className="brand-name">Medal Minds</strong>
            </Link>
            <p className="footer-copy">© 2024 Medal Minds. Free for students.</p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/science-bowl">Science Bowl</Link>
            <Link href="/science-olympiad">Science Olympiad</Link>
            <Link href="/math-olympiad">Math</Link>
            <Link href="/science-bowl/buzzer">Buzzer Arena</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
