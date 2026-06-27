import Link from "next/link";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";
import { MedalMark } from "@/components/MedalMark";

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
          {competitions.map((competition) => (
            <Link className="nav-link" href={competitionPath(competition.slug)} key={competition.slug}>
              {competition.name}
            </Link>
          ))}
        </nav>
        <Link className="button nav-cta" href="/science-bowl">
          Start Prep
        </Link>
      </div>
    </header>
  );
}
