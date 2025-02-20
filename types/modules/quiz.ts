import type { LucideIcon } from "lucide-react";

export type TQuizCategoryMetadata = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  quizCount: number;
  difficulty: string;
};

export type TQuizCategory =
  | "konsep-dasar"
  | "pengembangan-mobile"
  | "pengembangan-web"
  | "dev-sec";

// Struktur Collection untuk Quiz
export type TQuiz = {
  id: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  duration: number; // dalam menit
  total_points: number;
  total_questions: number;
  topics: string[];
  level: "Pemula" | "Menengah" | "Lanjutan";
  prerequisites?: string[]; // ID quiz yang harus diselesaikan
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

// Struktur Collection untuk Questions
export type TQuestion = {
  id: string;
  quiz_id: string;
  question: string;
  options: {
    id: string;
    text: string;
    is_correct: boolean;
  }[];
  points: number;
  created_at: string;
  updated_at: string;
};

// Struktur Collection untuk Quiz Attempts
export type TQuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  start_time: string;
  end_time: string;
  time_spend: string;
  status: "in_progress" | "completed" | "abandoned";
  score: number;
  total_correct: number;
  total_questions: number;
  answers: {
    question_id: string;
    selected_option_id: string;
    is_correct: boolean;
    points_earned: number;
  }[];
};

export interface IQuizResults {
  totalScore: number;
  totalCorrect: number;
  detailedAnswers: TQuizAttempt["answers"];
}

export interface ISubmitQuizParams {
  userId: string;
  quizId: string;
  answers: number[];
  questions: TQuestion[];
  startTime: string;
  time_spend: string;
  quizData: TQuiz;
}
