"use client";

export function BuzzerScoreboard({ teamA, teamB }: { teamA: number; teamB: number }) {
  return (
    <div className="buzzer-scoreboard" aria-label="Two-team scoreboard">
      <div>
        <span>Team A</span>
        <strong>{teamA}</strong>
      </div>
      <div>
        <span>Team B</span>
        <strong>{teamB}</strong>
      </div>
    </div>
  );
}
