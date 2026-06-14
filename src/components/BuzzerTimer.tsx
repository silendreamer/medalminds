"use client";

import { useEffect } from "react";
import { formatBuzzerElapsed } from "@/lib/buzzerEngine";

export function BuzzerTimer({
  running,
  elapsedMs,
  onTick
}: {
  running: boolean;
  elapsedMs: number;
  onTick: (nowMs: number) => void;
}) {
  useEffect(() => {
    if (!running) return;

    let frame = 0;
    const loop = () => {
      onTick(performance.now());
      frame = window.requestAnimationFrame(loop);
    };

    frame = window.requestAnimationFrame(loop);

    return () => window.cancelAnimationFrame(frame);
  }, [onTick, running]);

  return <span className="buzzer-timer">{formatBuzzerElapsed(elapsedMs)}</span>;
}

