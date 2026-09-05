import type { Question, Skill, McqQuestion, PromptQuestion } from "./types";
import listeningData from "@/data/questions/listening.json";
import readingData from "@/data/questions/reading.json";
import writingData from "@/data/questions/writing.json";
import speakingData from "@/data/questions/speaking.json";

const listening = listeningData as McqQuestion[];
const reading = readingData as McqQuestion[];
const writing = writingData as PromptQuestion[];
const speaking = speakingData as PromptQuestion[];

export const ALL_QUESTIONS: Question[] = [
  ...listening,
  ...reading,
  ...writing,
  ...speaking,
];

export function getQuestionsBySkill(skill: Skill): Question[] {
  if (skill === "mixed") {
    return shuffle([...ALL_QUESTIONS]);
  }
  return shuffle(ALL_QUESTIONS.filter((q) => q.skill === skill));
}

export function getQuestionById(id: string): Question | undefined {
  return ALL_QUESTIONS.find((q) => q.id === id);
}

export function getQuestionsByIds(ids: string[]): Question[] {
  const map = new Map(ALL_QUESTIONS.map((q) => [q.id, q]));
  return ids.map((id) => map.get(id)).filter(Boolean) as Question[];
}

export function countBySkill(): Record<string, number> {
  return {
    listening: listening.length,
    reading: reading.length,
    writing: writing.length,
    speaking: speaking.length,
    total: ALL_QUESTIONS.length,
  };
}

/** Fisher–Yates shuffle (non-mutating copy) */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const SKILL_META: Record<
  Exclude<Skill, "mixed">,
  { labelZh: string; labelEn: string; description: string; color: string }
> = {
  listening: {
    labelZh: "聽力",
    labelEn: "Listening",
    description: "聽取英語短訊並作答（含語音朗讀）",
    color: "bg-sky-500",
  },
  reading: {
    labelZh: "閱讀",
    labelEn: "Reading",
    description: "閱讀商業情境短文並選擇正解",
    color: "bg-emerald-500",
  },
  speaking: {
    labelZh: "口說",
    labelEn: "Speaking",
    description: "依提示作答，對照評分要點與範例",
    color: "bg-violet-500",
  },
  writing: {
    labelZh: "寫作",
    labelEn: "Writing",
    description: "撰寫商務郵件／備忘錄等，對照範例",
    color: "bg-amber-500",
  },
};
