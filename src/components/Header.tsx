"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom } from "lucide-react";
import { competitions } from "@/lib/data";
import { competitionPath } from "@/lib/routes";
import { CompetitionSwitcher } from "./CompetitionSwitcher";

export function Header() {
  const pathname = usePathname();

  if (pathname === "/brainbowl") {
    return null;
  }

  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Atom size={24} />
          </span>
          OlympiadPrep Hub
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link className="nav-link" href="/">
            Home
          </Link>
          {competitions.map((competition) => (
            <Link className="nav-link" href={competitionPath(competition.slug)} key={competition.slug}>
              {competition.name}
            </Link>
          ))}
        </nav>
        <CompetitionSwitcher />
      </div>
    </header>
  );
}
