"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";
import { competitionEmoji } from "@/lib/subjects";
import { UserMenu } from "@/components/auth/UserMenu";

export function Header() {
  const pathname = usePathname();

  const isActiveCompetition = (slug: string): boolean => {
    return pathname.startsWith(`/${slug}`);
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand */}
        <Link href="/" className="site-header-brand">
          <img
            src="/logo-mm.svg"
            alt="MedalMinds"
            className="site-header-logo"
          />
          <span>Medal Minds</span>
        </Link>

        {/* Navigation — hidden on mobile via .header-nav */}
        <nav className="header-nav">
          {competitions.map((competition) => {
            const emoji = competitionEmoji(competition.slug);
            const isActive = isActiveCompetition(competition.slug);
            const isComingSoon = competition.slug !== "science-bowl";

            return (
              <Link
                key={competition.slug}
                href={isComingSoon ? "#" : competitionPath(competition.slug)}
                aria-disabled={isComingSoon}
                className={`site-header-nav-link${isComingSoon ? " site-header-nav-link--disabled" : ""}${isActive ? " site-header-nav-link--active" : ""}`}
              >
                <div className={`site-header-nav-icon${isComingSoon ? " site-header-nav-icon--disabled" : ""}`}>
                  {emoji}
                </div>
                {competition.name}
              </Link>
            );
          })}
        </nav>

        <UserMenu />
      </div>
    </header>
  );
}
