import { TQuiz } from "./quiz";

export type TUsers = {
  uid: string;
  email: string;
  username: string;
  name: string;
  is_active: boolean;
  image: string;
  role: {
    id: number;
    nama: string;
  };
};

export type TUserProgress = {
  id: string;
  total_points: number;
  current_level: string;

  // Progress pembelajaran
  courses_progress: {
    course_id: string;
    completed_modules: number;
    progress_percentage: number;
    last_accessed: string; // ISO date string
    modules: {
      module_id: string;
      status: "not_started" | "in_progress" | "completed";
      completed_chapters: string[];
      last_accessed: string;
    }[];
  }[];

  // Menyimpan hasil quiz yang sudah ada
  completed_quizzes: {
    quiz_id: string;
    highest_score: number;
    attempts: number;
    last_attempt_date: string;
  }[];

  // Menyimpan achievements yang sudah ada
  achievements: {
    id: string;
    name: string;
    earned_at: string;
  }[];
};

export interface IUpdateUserProgressParams {
  userId: string;
  quizId: string;
  score: number;
  quizData: TQuiz;
}
