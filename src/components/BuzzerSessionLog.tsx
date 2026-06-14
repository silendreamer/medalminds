"use client";

import { formatBuzzerElapsed, type BuzzerEvent } from "@/lib/buzzerEngine";

export function BuzzerSessionLog({ entries }: { entries: BuzzerEvent[] }) {
  return (
    <div className="card stack buzzer-log-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Session log</span>
          <h3>Round events</h3>
        </div>
      </div>
      {entries.length ? (
        <div className="buzzer-log">
          {entries.map((entry) => (
            <div className="buzzer-log-entry" key={entry.id}>
              <div className="buzzer-log-meta">
                <strong>{entry.label}</strong>
                <span>{formatBuzzerElapsed(entry.elapsedMs)}</span>
              </div>
              <p>{entry.detail}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">Event history will appear here during the round.</div>
      )}
    </div>
  );
}

