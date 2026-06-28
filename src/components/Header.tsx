"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";

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
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e7e9ee",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", maxWidth: "1200px", margin: "0 auto", padding: "16px 24px", height: "auto" }}>
        {/* Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            fontWeight: 700,
            fontSize: "16px",
            color: "#1a2745",
            textDecoration: "none",
            flexShrink: 0
          }}
        >
          <img
            src="/logo-mm.svg"
            alt="MedalMinds"
            style={{
              width: "38px",
              height: "38px",
              flexShrink: 0
            }}
          />
          <span>Medal Minds</span>
        </Link>

        {/* Navigation — hidden on mobile */}
        <nav className="header-nav">
          {competitions.map((competition) => {
            const emoji = NAV_EMOJIS[competition.slug];
            const isActive = isActiveCompetition(competition.slug);
            const isComingSoon = competition.slug !== "science-bowl";

            return (
              <Link
                key={competition.slug}
                href={isComingSoon ? "#" : competitionPath(competition.slug)}
                aria-disabled={isComingSoon}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isComingSoon ? "#c0c7d4" : isActive ? "#5a92f0" : "#1a2745",
                  textDecoration: "none",
                  paddingBottom: "3px",
                  borderBottom: isActive ? "2px solid #5a92f0" : "2px solid transparent",
                  transition: "border-color 150ms ease, color 150ms ease",
                  pointerEvents: isComingSoon ? "none" : undefined,
                  cursor: isComingSoon ? "default" : "pointer"
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: isComingSoon ? "#e5e7eb" : "#1a2745",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isComingSoon ? "#9ca3af" : "#fff",
                    fontSize: "15px",
                    lineHeight: 1
                  }}
                >
                  {emoji}
                </div>
                {competition.name}
              </Link>
            );
          })}
        </nav>

        {/* Sign In Button */}
        <Link
          href="/api/auth/signin"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 22px",
            minHeight: "44px",
            borderRadius: "8px",
            background: "#1a2745",
            color: "#fff",
            border: "1px solid #1a2745",
            fontSize: "14px",
            fontWeight: 600,
            fontFamily: "Open Sans, sans-serif",
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 150ms ease",
            flexShrink: 0
          }}
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
