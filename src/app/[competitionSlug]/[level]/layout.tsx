import { notFound } from "next/navigation";
import { isCompetitionSlug } from "@/lib/data";

const VALID_LEVELS = ["middle-school", "high-school", "grade-5", "grade-6", "grade-7", "grade-8", "grade-9", "grade-10", "grade-11", "grade-12"];

export default async function LevelLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ competitionSlug: string; level: string }>;
}) {
  const { competitionSlug, level } = await params;
  if (!isCompetitionSlug(competitionSlug) || !VALID_LEVELS.includes(level)) notFound();
  return <>{children}</>;
}
