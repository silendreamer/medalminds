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
          <div
            style={{
              width: "38px",
              height: "38px",
              background: "#1a2745",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontFamily: "Poppins, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: "18px",
              flexShrink: 0
            }}
          >
            M
          </div>
          <span>Medal Minds</span>
        </Link>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            gap: "26px",
            alignItems: "center",
            marginLeft: "auto"
          }}
        >
          {competitions.map((competition) => {
            const emoji = NAV_EMOJIS[competition.slug];
            const isActive = isActiveCompetition(competition.slug);

            return (
              <Link
                key={competition.slug}
                href={competitionPath(competition.slug)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isActive ? "#5a92f0" : "#1a2745",
                  textDecoration: "none",
                  paddingBottom: "3px",
                  borderBottom: isActive ? "2px solid #5a92f0" : "2px solid transparent",
                  transition: "border-color 150ms ease, color 150ms ease"
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "7px",
                    background: "#1a2745",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
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
