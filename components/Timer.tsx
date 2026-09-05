"use client";

import { useEffect, useState } from "react";

type Props = {
  seconds: number;
  running?: boolean;
  onExpire?: () => void;
};

export default function Timer({ seconds, running = true, onExpire }: Props) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running || left <= 0) return;
    const id = setInterval(() => {
      setLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          onExpire?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, left, onExpire]);

  const m = Math.floor(left / 60);
  const s = left % 60;
  const urgent = left <= 30;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-mono font-semibold tabular-nums ${
        urgent
          ? "bg-red-100 text-red-700"
          : "bg-slate-100 text-slate-700"
      }`}
      aria-live="polite"
    >
      <span aria-hidden>⏱</span>
      {m}:{s.toString().padStart(2, "0")}
    </div>
  );
}
