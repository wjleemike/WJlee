"use client";

import { useCallback, useState } from "react";

type Props = {
  text: string;
  label?: string;
};

export default function TtsPlayButton({
  text,
  label = "播放朗讀 / Play",
}: Props) {
  const [speaking, setSpeaking] = useState(false);

  const play = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      alert("此瀏覽器不支援語音合成 / SpeechSynthesis not supported.");
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.95;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, [text]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSpeaking(false);
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={play}
        className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        {speaking ? "🔊 播放中…" : `🔊 ${label}`}
      </button>
      {speaking && (
        <button
          type="button"
          onClick={stop}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          停止 / Stop
        </button>
      )}
    </div>
  );
}
