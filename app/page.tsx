import SkillCard from "@/components/SkillCard";
import Disclaimer from "@/components/Disclaimer";
import { countBySkill, SKILL_META } from "@/lib/questions";

export default function HomePage() {
  const counts = countBySkill();

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 px-6 py-8 text-white shadow-lg">
        <h2 className="text-xl font-bold sm:text-2xl text-balance">
          聽力 · 閱讀 · 口說 · 寫作
        </h2>
        <p className="mt-2 max-w-xl text-sm text-brand-100 leading-relaxed">
          選擇技能開始練習。題目為原創商務英語情境（辦公室、出差、餐飲、郵件、會議），介面為繁體中文，題幹為英文。
        </p>
        <p className="mt-3 text-xs text-brand-200">
          題庫共 {counts.total} 題 / {counts.total} original practice questions
        </p>
      </section>

      <Disclaimer />

      <section>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          選擇練習項目 / Choose a skill
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            Object.keys(SKILL_META) as Array<keyof typeof SKILL_META>
          ).map((key) => {
            const meta = SKILL_META[key];
            return (
              <SkillCard
                key={key}
                href={`/practice/${key}`}
                titleZh={meta.labelZh}
                titleEn={meta.labelEn}
                description={meta.description}
                count={counts[key]}
                accent={meta.color}
              />
            );
          })}
          <SkillCard
            href="/practice/mixed"
            titleZh="綜合練習"
            titleEn="Mixed"
            description="從全部題庫隨機出題，四種技能混合練習"
            count={counts.total}
            accent="bg-rose-500"
          />
        </div>
      </section>
    </div>
  );
}
