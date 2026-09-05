"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question, Skill, UserAnswer } from "@/lib/types";
import { buildResult } from "@/lib/scoring";
import QuestionCard from "./QuestionCard";
import Timer from "./Timer";
import ResultsSummary from "./ResultsSummary";

type Props = {
  skill: Skill;
  questions: Question[];
  /** Per-question seconds for timed skills; 0 = no timer */
  timerSeconds?: number;
};

export default function QuizPlayer({
  skill,
  questions,
  timerSeconds = 0,
}: Props) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [finished, setFinished] = useState(false);
  const [showCurrentFeedback, setShowCurrentFeedback] = useState(false);

  const current = questions[index];
  const progress = ((index + (finished ? 1 : 0)) / questions.length) * 100;
  const isPrompt = current?.type === "prompt";
  const useTimer = timerSeconds > 0 && (skill === "listening" || skill === "reading" || skill === "mixed");

  const result = useMemo(() => {
    if (!finished) return null;
    const list: UserAnswer[] = questions.map((q) => ({
      questionId: q.id,
      value: answers[q.id] ?? (q.type === "mcq" ? -1 : ""),
    }));
    return buildResult(skill, questions, list);
  }, [finished, questions, answers, skill]);

  const setValue = useCallback(
    (value: number | string) => {
      if (!current || showCurrentFeedback) return;
      setAnswers((prev) => ({ ...prev, [current.id]: value }));
    },
    [current, showCurrentFeedback]
  );

  const canProceed = useCallback(() => {
    if (!current) return false;
    const v = answers[current.id];
    if (current.type === "mcq") return typeof v === "number" && v >= 0;
    return typeof v === "string" && v.trim().length > 0;
  }, [current, answers]);

  const goNext = useCallback(() => {
    if (isPrompt && !showCurrentFeedback) {
      setShowCurrentFeedback(true);
      return;
    }
    setShowCurrentFeedback(false);
    if (index >= questions.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
  }, [index, questions.length, isPrompt, showCurrentFeedback]);

  const submitAll = useCallback(() => {
    setFinished(true);
  }, []);

  if (!current && !finished) {
    return (
      <p className="text-center text-slate-600">尚無題目 / No questions.</p>
    );
  }

  if (finished && result) {
    return <ResultsSummary result={result} questions={questions} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>進度 / Progress</span>
            <span>
              {index + 1} / {questions.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-brand-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {useTimer && (
          <Timer
            key={current.id}
            seconds={timerSeconds}
            onExpire={() => {
              if (!canProceed()) {
                setAnswers((prev) => ({
                  ...prev,
                  [current.id]: current.type === "mcq" ? -1 : "",
                }));
              }
              goNext();
            }}
          />
        )}
      </div>

      <QuestionCard
        question={current}
        index={index}
        total={questions.length}
        value={answers[current.id]}
        onChange={setValue}
        showFeedback={showCurrentFeedback}
        recordingStub
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-sm text-slate-500 hover:text-slate-800 hover:underline"
        >
          ← 離開練習
        </button>
        <div className="flex gap-2">
          {index === questions.length - 1 &&
          (!isPrompt || showCurrentFeedback) ? (
            <button
              type="button"
              disabled={!canProceed() && !showCurrentFeedback}
              onClick={submitAll}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              交卷 / Submit
            </button>
          ) : (
            <button
              type="button"
              disabled={!canProceed() && !showCurrentFeedback}
              onClick={goNext}
              className="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPrompt && !showCurrentFeedback
                ? "送出並看範例 / Check"
                : "下一題 / Next"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
