"use client";

import { useRouter } from "next/navigation";
import { competitions } from "@/data/competitions";
import { competitionPath } from "@/lib/routes";

export function CompetitionSwitcher() {
  const router = useRouter();

  return (
    <label aria-label="Competition switcher">
      <select className="select" defaultValue="" onChange={(event) => router.push(competitionPath(event.target.value as never))}>
        <option value="" disabled>
          Switch competition
        </option>
        {competitions.map((competition) => (
          <option value={competition.slug} key={competition.slug}>
            {competition.name}
          </option>
        ))}
      </select>
    </label>
  );
}
