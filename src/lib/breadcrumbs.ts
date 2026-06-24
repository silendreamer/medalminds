import type { CompetitionSlug } from "@/types";
import { competitionPath } from "./routes";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function getSchoolLevelLabel(competitionSlug: CompetitionSlug, level?: string | null) {
  if (competitionSlug !== "science-bowl") return undefined;
  if (level === "middle-school") return "Middle School";
  if (level === "high-school") return "High School";
  return undefined;
}

export function buildStudyBreadcrumbs({
  competitionSlug,
  competitionName,
  level,
  action,
  actionHref,
  subject,
  current
}: {
  competitionSlug: CompetitionSlug;
  competitionName: string;
  level?: string | null;
  action?: string | null;
  actionHref?: string;
  subject?: string | null;
  current?: string;
}) {
  const items: BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    { label: competitionName, href: competitionPath(competitionSlug) }
  ];
  const levelLabel = getSchoolLevelLabel(competitionSlug, level);
  const levelQuery = levelLabel && level ? `level=${level}` : "";

  if (levelLabel) {
    items.push({
      label: levelLabel,
      href: `${competitionPath(competitionSlug)}?${levelQuery}`
    });
  }

  if (action) {
    items.push({ label: action, href: actionHref });
  }

  if (subject) {
    items.push({ label: subject });
  } else if (current && !action) {
    items.push({ label: current });
  } else if (items.length > 1) {
    delete items[items.length - 1].href;
  }

  return items;
}
