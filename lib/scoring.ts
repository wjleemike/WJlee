import type { Question, UserAnswer, QuizResult, Skill } from "./types";

export function scoreMcq(
  question: Question,
  selectedIndex: number
): boolean {
  if (question.type !== "mcq") return false;
  return question.answerIndex === selectedIndex;
}

export function buildResult(
  skill: Skill,
  questions: Question[],
  answers: UserAnswer[]
): QuizResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a]));
  let correct = 0;
  let scored = 0;

  const scoredAnswers: UserAnswer[] = questions.map((q) => {
    const raw = answerMap.get(q.id);
    if (q.type === "mcq") {
      scored += 1;
      const selected =
        typeof raw?.value === "number" ? raw.value : -1;
      const isCorrect = selected === q.answerIndex;
      if (isCorrect) correct += 1;
      return {
        questionId: q.id,
        value: selected,
        isCorrect,
      };
    }
    // Prompt questions are not auto-scored
    return {
      questionId: q.id,
      value: typeof raw?.value === "string" ? raw.value : "",
      isCorrect: undefined,
    };
  });

  const percentage = scored === 0 ? 0 : Math.round((correct / scored) * 100);

  return {
    skill,
    total: questions.length,
    scored,
    correct,
    percentage,
    answers: scoredAnswers,
    questionIds: questions.map((q) => q.id),
  };
}

export function gradeLabel(percentage: number): string {
  if (percentage >= 90) return "優秀 / Excellent";
  if (percentage >= 80) return "良好 / Good";
  if (percentage >= 70) return "尚可 / Fair";
  if (percentage >= 60) return "需加強 / Needs Practice";
  return "繼續努力 / Keep Practicing";
}
