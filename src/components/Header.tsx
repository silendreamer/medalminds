"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, Atom, Sigma } from "lucide-react";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";
import { MedalMark } from "@/components/MedalMark";

const NAV_ICONS: Record<string, React.ElementType> = {
  "science-bowl": FlaskConical,
  "science-olympiad": Atom,
  "math-olympiad": Sigma
};

const NAV_EMOJIS: Record<string, string> = {
  "science-bowl": "🧪",
  "science-olympiad": "🔬",
  "math-olympiad": "∑"
};

export function Header() {
  const pathname = usePathname();

  const isActiveCompetition = (slug: string): boolean => {
    return pathname.startsWith(`/${slug}`);
  };

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
            const emoji = NAV_EMOJIS[competition.slug];
            const isActive = isActiveCompetition(competition.slug);

            return (
              <Link
                className={`nav-link ${isActive ? "active" : ""}`}
                href={competitionPath(competition.slug)}
                key={competition.slug}
              >
                {emoji && <span className="nav-link-emoji" aria-hidden="true">{emoji}</span>}
                {competition.name}
                {isActive && <span className="nav-link-indicator" aria-label="current page" />}
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
