import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuzzerArena } from "@/components/BuzzerArena";
import { getCompetitionBySlug } from "@/lib/data";
import { competitionPath } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Science Bowl Buzzer Practice | NSB Team Drills | Medal Minds",
  description:
    "Run live Science Bowl buzzer practice rooms for National Science Bowl team drills, toss-up timing, and fast recall training.",
  path: "/science-bowl/buzzer",
  keywords: ["Science Bowl buzzer", "NSB buzzer practice", "Science Bowl team practice"]
});

export default async function BuzzerPage({ params }: { params: Promise<{ competitionSlug: string }> }) {
  const { competitionSlug } = await params;

  if (competitionSlug !== "science-bowl") {
    notFound();
  }

  const competition = await getCompetitionBySlug(competitionSlug);
  if (!competition) notFound();

  return (
    <section className="section buzzer-page">
      <div className="container stack">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: competition.name, href: competitionPath("science-bowl") },
            { label: "Buzzer Practice" }
          ]}
        />
        <BuzzerArena />
      </div>
    </section>
  );
}
