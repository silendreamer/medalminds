"use client";

import { useEffect, useState } from "react";

export function BuzzerTimer({
  running,
  resetKey,
  onTick
}: {
  running: boolean;
  resetKey: string;
  onTick?: (seconds: number) => void;
}) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    onTick?.(0);
  }, [resetKey, onTick]);

  useEffect(() => {
    if (!running) return;

    const interval = window.setInterval(() => {
      setSeconds((current) => {
        const next = current + 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [running, onTick]);

  return <span className="buzzer-timer">{seconds.toString().padStart(2, "0")}s</span>;
}
