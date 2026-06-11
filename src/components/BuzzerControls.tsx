"use client";

export function BuzzerControls({
  mode,
  started,
  buzzedTeam,
  soloBuzzed,
  onStart,
  onSoloBuzz,
  onTeamBuzz,
  onReset
}: {
  mode: "solo" | "teams";
  started: boolean;
  buzzedTeam: "A" | "B" | null;
  soloBuzzed: boolean;
  onStart: () => void;
  onSoloBuzz: () => void;
  onTeamBuzz: (team: "A" | "B") => void;
  onReset: () => void;
}) {
  return (
    <div className="card buzzer-controls">
      <div className="actions">
        <button className="button" onClick={onStart} disabled={started}>
          Start Question
        </button>
        <button className="ghost-button" onClick={onReset}>
          Reset Round
        </button>
      </div>

      {mode === "solo" ? (
        <button className="buzzer-big-button" onClick={onSoloBuzz} disabled={!started || soloBuzzed}>
          Buzz
        </button>
      ) : (
        <div className="buzzer-team-buttons">
          <button onClick={() => onTeamBuzz("A")} disabled={!started || Boolean(buzzedTeam)}>
            Team A Buzz
            <span>Key A</span>
          </button>
          <button onClick={() => onTeamBuzz("B")} disabled={!started || Boolean(buzzedTeam)}>
            Team B Buzz
            <span>Key L</span>
          </button>
        </div>
      )}
    </div>
  );
}
