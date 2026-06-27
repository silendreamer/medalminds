import Link from "next/link";
import { FlaskConical, Atom, Sigma } from "lucide-react";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";
import { MedalMark } from "@/components/MedalMark";

const NAV_ICONS: Record<string, React.ElementType> = {
  "science-bowl": FlaskConical,
  "science-olympiad": Atom,
  "math-olympiad": Sigma
};

export function Header() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            <MedalMark size={44} />
          </span>
          <strong className="brand-name">Medal Minds</strong>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          {competitions.map((competition) => {
            const Icon = NAV_ICONS[competition.slug];
            return (
              <Link className="nav-link" href={competitionPath(competition.slug)} key={competition.slug}>
                {Icon && <Icon size={16} aria-hidden="true" />}
                {competition.name}
              </Link>
            );
          })}
        </nav>
        <Link className="button nav-cta" href="/api/auth/signin">
          Sign In
        </Link>
      </div>
    </header>
  );
}
