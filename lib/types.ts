export type Skill = "listening" | "reading" | "speaking" | "writing" | "mixed";

export type McqQuestion = {
  id: string;
  skill: "listening" | "reading";
  type: "mcq";
  topic: string;
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  explanation: string;
  /** English transcript for listening TTS */
  transcript?: string;
};

export type PromptQuestion = {
  id: string;
  skill: "speaking" | "writing";
  type: "prompt";
  topic: string;
  prompt: string;
  rubric: string[];
  sampleAnswer: string;
  guidance?: string;
};

export type Question = McqQuestion | PromptQuestion;

export type UserAnswer = {
  questionId: string;
  /** For MCQ: selected choice index; for prompt: free text */
  value: number | string;
  isCorrect?: boolean;
};

export type QuizResult = {
  skill: Skill;
  total: number;
  scored: number;
  correct: number;
  percentage: number;
  answers: UserAnswer[];
  questionIds: string[];
};
