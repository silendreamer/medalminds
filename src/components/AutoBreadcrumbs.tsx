"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { competitions } from "@/data/competitions";

interface Crumb {
  label: string;
  href?: string;
}

const competitionBySlug = Object.fromEntries(competitions.map((c) => [c.slug, c]));

const STATIC_SECOND_SEGMENTS = new Set(["buzzer", "info-session"]);
const LEVEL_SEGMENTS = new Set([
  "middle-school", "high-school",
  "grade-5", "grade-6", "grade-7", "grade-8",
  "grade-9", "grade-10", "grade-11", "grade-12"
]);

function levelLabel(level: string): string {
  if (level === "middle-school") return "Middle School";
  if (level === "high-school") return "High School";
  // grade-5 → Grade 5
  return level.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function slugToLabel(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildCrumbs(pathname: string): Crumb[] {
  const segments = pathname.replace(/^\//, "").split("/").filter(Boolean);
  if (segments.length === 0) return [];

  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];
  const [first, second, third, fourth, fifth] = segments;

  const competition = competitionBySlug[first];
  if (!competition) return crumbs;

  // /science-bowl/buzzer
  if (second === "buzzer") {
    crumbs.push({ label: competition.name, href: `/${first}` });
    crumbs.push({ label: "Buzzer Practice" });
    return crumbs;
  }

  // /science-bowl/info-session
  if (second === "info-session") {
    crumbs.push({ label: competition.name, href: `/${first}` });
    crumbs.push({ label: "Team Guide" });
    return crumbs;
  }

  // /{slug} — competition hub (no second segment)
  if (!second) {
    crumbs.push({ label: competition.name });
    return crumbs;
  }

  // If second segment is a level, use path-based structure
  const hasLevel = LEVEL_SEGMENTS.has(second);
  const level = hasLevel ? second : null;
  const section = hasLevel ? third : second; // "practice" | "learning" | "tests"
  const levelBase = level ? `/${first}/${level}` : `/${first}`;

  crumbs.push({ label: competition.name, href: `/${first}` });

  if (level) {
    // /{slug}/{level} — level hub (no section)
    if (!section) {
      crumbs.push({ label: levelLabel(level) });
      return crumbs;
    }
    crumbs.push({ label: levelLabel(level), href: `/${first}/${level}` });
  }

  if (!section) return crumbs;

  if (section === "practice") {
    // fourth segment (with level) is subjectSlug: /{slug}/{level}/practice/{subjectSlug}
    const subjectSlug = level ? fourth : third;
    if (subjectSlug) {
      crumbs.push({ label: "Practice", href: `${levelBase}/practice` });
      crumbs.push({ label: slugToLabel(subjectSlug) });
    } else {
      crumbs.push({ label: "Practice" });
    }
    return crumbs;
  }

  if (section === "tests") {
    const afterTests = level ? fourth : third;
    const afterAfterTests = level ? fifth : fourth;
    // /tests/subject/{subjectSlug}
    if (afterTests === "subject" && afterAfterTests) {
      crumbs.push({ label: "Tests", href: `${levelBase}/tests` });
      crumbs.push({ label: slugToLabel(afterAfterTests) });
    } else if (afterTests) {
      // /tests/{testId}
      crumbs.push({ label: "Tests", href: `${levelBase}/tests` });
      crumbs.push({ label: slugToLabel(afterTests) });
    } else {
      crumbs.push({ label: "Tests" });
    }
    return crumbs;
  }

  if (section === "learning") {
    const learningBase = `${levelBase}/learning`;
    const afterLearning = level ? fourth : third;
    const afterAfter = level ? fifth : fourth;

    // /learning/subject/{subjectSlug}
    if (afterLearning === "subject" && afterAfter) {
      crumbs.push({ label: "Learning", href: learningBase });
      crumbs.push({ label: slugToLabel(afterAfter) });
      return crumbs;
    }

    // /learning/{lessonId}
    if (afterLearning && afterLearning !== "subject") {
      crumbs.push({ label: "Learning", href: learningBase });
      crumbs.push({ label: slugToLabel(afterLearning) });
      return crumbs;
    }

    crumbs.push({ label: "Learning" });
    return crumbs;
  }

  crumbs.push({ label: slugToLabel(section) });
  return crumbs;
}

export function AutoBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = buildCrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <div className="global-breadcrumb-bar">
      <div className="container">
        <nav className="breadcrumbs" aria-label="Breadcrumbs">
          {/* Mobile ellipsis — shown only when there are more than 2 crumbs */}
          {crumbs.length > 2 && (
            <span className="breadcrumb-item breadcrumb-ellipsis" aria-hidden="true">
              …
              <ChevronRight aria-hidden="true" className="breadcrumb-chevron" size={13} />
            </span>
          )}
          {crumbs.map((crumb, index) => (
            <span key={`${crumb.label}-${index}`} className="breadcrumb-item">
              {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
              {index < crumbs.length - 1 && (
                <ChevronRight aria-hidden="true" className="breadcrumb-chevron" size={13} />
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}
