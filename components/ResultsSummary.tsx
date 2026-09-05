"use client";

import Link from "next/link";
import type { Question, QuizResult } from "@/lib/types";
import { gradeLabel } from "@/lib/scoring";
import QuestionCard from "./QuestionCard";

type Props = {
  result: QuizResult;
  questions: Question[];
};

export default function ResultsSummary({ result, questions }: Props) {
  const wrong = result.answers.filter(
    (a) => a.isCorrect === false
  );
  const qMap = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <p className="text-sm font-medium text-slate-500">練習結果 / Results</p>
        {result.scored > 0 ? (
          <>
            <p className="mt-2 text-5xl font-bold text-brand-700">
              {result.percentage}%
            </p>
            <p className="mt-2 text-slate-700">
              選擇題答對 {result.correct} / {result.scored}
            </p>
            <p className="mt-1 text-sm font-medium text-emerald-700">
              {gradeLabel(result.percentage)}
            </p>
          </>
        ) : (
          <p className="mt-3 text-slate-700">
            本題組為口說／寫作練習，請對照下方評分要點與範例自我檢討。
          </p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          總題數 {result.total}
          {result.total > result.scored
            ? `（含 ${result.total - result.scored} 題非自動計分）`
            : ""}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={`/practice/${result.skill}`}
            className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
          >
            再練一次 / Retry
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            回首頁 / Home
          </Link>
        </div>
      </div>

      {wrong.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            錯題複習 / Review incorrect ({wrong.length})
          </h2>
          <div className="space-y-4">
            {wrong.map((a, i) => {
              const q = qMap.get(a.questionId);
              if (!q) return null;
              return (
                <QuestionCard
                  key={a.questionId}
                  question={q}
                  index={i}
                  total={wrong.length}
                  value={a.value}
                  onChange={() => {}}
                  showFeedback
                />
              );
            })}
          </div>
        </section>
      )}

      {result.scored === 0 && (
        <section>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">
            作答與範例 / Your answers & samples
          </h2>
          <div className="space-y-4">
            {result.answers.map((a, i) => {
              const q = qMap.get(a.questionId);
              if (!q) return null;
              return (
                <QuestionCard
                  key={a.questionId}
                  question={q}
                  index={i}
                  total={result.answers.length}
                  value={a.value}
                  onChange={() => {}}
                  showFeedback
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
