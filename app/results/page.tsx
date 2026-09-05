import Link from "next/link";

/**
 * Results are primarily shown in-session via QuizPlayer state.
 * This page exists as a friendly fallback when opened directly.
 */
export default function ResultsPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">練習結果 / Results</h2>
      <p className="mt-3 text-sm text-slate-600 leading-relaxed">
        完成練習後，結果會顯示在練習頁面（分數、錯題複習、寫作／口說範例）。
        Results appear on the practice page after you submit a quiz.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
      >
        回首頁開始練習
      </Link>
    </div>
  );
}
