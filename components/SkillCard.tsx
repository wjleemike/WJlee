import Link from "next/link";

type Props = {
  href: string;
  titleZh: string;
  titleEn: string;
  description: string;
  count?: number;
  accent: string;
};

export default function SkillCard({
  href,
  titleZh,
  titleEn,
  description,
  count,
  accent,
}: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
    >
      <div className={`mb-3 h-1.5 w-12 rounded-full ${accent}`} />
      <h2 className="text-lg font-semibold text-slate-900">
        {titleZh}{" "}
        <span className="font-normal text-slate-500">/ {titleEn}</span>
      </h2>
      <p className="mt-2 flex-1 text-sm text-slate-600 leading-relaxed">
        {description}
      </p>
      {typeof count === "number" && (
        <p className="mt-3 text-xs font-medium text-brand-600">
          {count} 題 / questions
        </p>
      )}
      <span className="mt-4 inline-flex items-center text-sm font-medium text-brand-700 group-hover:underline">
        開始練習 →
      </span>
    </Link>
  );
}
