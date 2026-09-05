"use client";

import type { Question } from "@/lib/types";
import TtsPlayButton from "./TtsPlayButton";

type Props = {
  question: Question;
  index: number;
  total: number;
  value: number | string | undefined;
  onChange: (value: number | string) => void;
  showFeedback?: boolean;
  recordingStub?: boolean;
};

export default function QuestionCard({
  question,
  index,
  total,
  value,
  onChange,
  showFeedback = false,
  recordingStub = false,
}: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
          第 {index + 1} / {total} 題 · {question.topic}
        </span>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
          {question.skill}
        </span>
      </div>

      {question.type === "mcq" && question.transcript && (
        <div className="mb-4 rounded-xl bg-sky-50 p-4">
          <p className="mb-2 text-xs font-medium text-sky-800">
            聽力內容 / Listening transcript
          </p>
          <TtsPlayButton text={question.transcript} />
          <details className="mt-3">
            <summary className="cursor-pointer text-xs text-sky-700 hover:underline">
              顯示文字稿 / Show transcript
            </summary>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              {question.transcript}
            </p>
          </details>
        </div>
      )}

      <p className="whitespace-pre-wrap text-base text-slate-900 leading-relaxed">
        {question.prompt}
      </p>

      {question.type === "mcq" ? (
        <fieldset className="mt-5 space-y-2">
          <legend className="sr-only">選項</legend>
          {question.choices.map((choice, i) => {
            const selected = value === i;
            const isCorrect = showFeedback && i === question.answerIndex;
            const isWrong =
              showFeedback && selected && i !== question.answerIndex;
            return (
              <label
                key={i}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                  isCorrect
                    ? "border-emerald-400 bg-emerald-50"
                    : isWrong
                      ? "border-red-300 bg-red-50"
                      : selected
                        ? "border-brand-400 bg-brand-50"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  className="mt-0.5"
                  checked={selected}
                  disabled={showFeedback}
                  onChange={() => onChange(i)}
                />
                <span>{choice}</span>
              </label>
            );
          })}
          {showFeedback && (
            <p className="mt-3 text-sm text-slate-600">
              <span className="font-medium text-slate-800">解析：</span>
              {question.explanation}
            </p>
          )}
        </fieldset>
      ) : (
        <div className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              你的作答 / Your response
            </span>
            <textarea
              className="min-h-[140px] w-full rounded-xl border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder={
                question.skill === "speaking"
                  ? "輸入你的口說大綱或逐字稿… / Outline or transcript"
                  : "在此撰寫你的回答… / Write your answer here"
              }
              value={typeof value === "string" ? value : ""}
              onChange={(e) => onChange(e.target.value)}
              disabled={showFeedback}
            />
          </label>

          {recordingStub && question.skill === "speaking" && !showFeedback && (
            <RecordingStub />
          )}

          {showFeedback && (
            <div className="space-y-3 rounded-xl bg-violet-50 p-4 text-sm">
              {question.guidance && (
                <p>
                  <span className="font-medium">提示 / Guidance：</span>
                  {question.guidance}
                </p>
              )}
              <div>
                <p className="font-medium mb-1">評分要點 / Rubric</p>
                <ul className="list-disc space-y-1 pl-5 text-slate-700">
                  {question.rubric.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium mb-1">範例作答 / Sample</p>
                <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {question.sampleAnswer}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function RecordingStub() {
  return (
    <div className="rounded-xl border border-dashed border-violet-300 bg-violet-50/50 px-4 py-3 text-sm text-violet-800">
      <p className="font-medium">錄音（示意）/ MediaRecorder stub</p>
      <p className="mt-1 text-violet-700/90">
        實際瀏覽器錄音可在此整合 MediaRecorder。目前請以文字記錄你的口說內容。
      </p>
      <button
        type="button"
        className="mt-2 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white opacity-60"
        disabled
        title="Stub only"
      >
        🎤 開始錄音（尚未啟用）
      </button>
    </div>
  );
}
