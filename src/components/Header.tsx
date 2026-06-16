"use client";

import Link from "next/link";
import { Medal } from "lucide-react";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";

export function Header() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span aria-hidden="true" className="brand-mark">
            <Medal size={24} />
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
            <Link className="nav-link" href={competitionPath(competition.slug)} key={competition.slug}>
              {competition.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
