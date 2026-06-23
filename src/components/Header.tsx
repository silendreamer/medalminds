import Link from "next/link";
import { competitions } from "@/data/competitions";
import { competitionPath, learningPath } from "@/lib/routes"; // Added learningPath import
import { MedalMark } from "@/components/MedalMark";

export function Header() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            <MedalMark size={44} />
          </span>
          <span className="brand-copy">
            <strong>Medal Minds</strong>
            <span>Competition prep platform</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link className="nav-link" href="/">
            Home
          </Link>
          {competitions.map((competition) => (
            <> {/* Use a React Fragment to group multiple links */}
              <Link className="nav-link" href={competitionPath(competition.slug)} key={competition.slug}>
                {competition.name}
              </Link>
              {/* Add a Learning link for each competition */}
              <Link className="nav-link" href={learningPath(competition.slug)} key={`${competition.slug}-learning`}>
                Learning ({competition.name})
              </Link>
            </>
          ))}
        </nav>
      </div>
    </header>
  );
}
