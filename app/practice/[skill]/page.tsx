import { notFound } from "next/navigation";
import QuizPlayer from "@/components/QuizPlayer";
import { getQuestionsBySkill, SKILL_META } from "@/lib/questions";
import type { Skill } from "@/lib/types";

const VALID: Skill[] = [
  "listening",
  "reading",
  "speaking",
  "writing",
  "mixed",
];

type Props = {
  params: Promise<{ skill: string }>;
};

export function generateStaticParams() {
  return VALID.map((skill) => ({ skill }));
}

export default async function PracticePage({ params }: Props) {
  const { skill: raw } = await params;
  if (!VALID.includes(raw as Skill)) notFound();
  const skill = raw as Skill;

  let questions = getQuestionsBySkill(skill);

  // Cap mixed sessions for UX
  if (skill === "mixed") {
    questions = questions.slice(0, 20);
  }

  const title =
    skill === "mixed"
      ? { zh: "綜合練習", en: "Mixed" }
      : {
          zh: SKILL_META[skill].labelZh,
          en: SKILL_META[skill].labelEn,
        };

  const timerSeconds =
    skill === "listening" ? 60 : skill === "reading" ? 90 : skill === "mixed" ? 75 : 0;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {title.zh}{" "}
          <span className="font-normal text-slate-500">/ {title.en}</span>
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          共 {questions.length} 題
          {timerSeconds > 0
            ? ` · 每題限時約 ${timerSeconds} 秒（可選計時）`
            : " · 口說／寫作不限時，送出後顯示評分要點與範例"}
        </p>
      </div>
      <QuizPlayer
        skill={skill}
        questions={questions}
        timerSeconds={timerSeconds}
      />
    </div>
  );
}
