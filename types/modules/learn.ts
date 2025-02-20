import { LucideIcon } from "lucide-react";

export type TLearnCategory =
  | "konsep-dasar"
  | "pengembangan-mobile"
  | "pengembangan-web"
  | "dev-sec";

export type TLearnCategoryMetadata = {
  id: TLearnCategory;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  modulCount: number;
  difficulty: string;
  total_points: number;
  total_duration: number;
  progress: number;
};

export type TCourse = {
  id: string;
  title: string;
  description: string;
  category: {
    id: string;
    name: string;
  };
  duration: number;
  total_points: number;
  total_modules: number;
  level: "Pemula" | "Menengah" | "Lanjutan";
  prerequisites?: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type TModule = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  points: number;
  total_chapters: number;
  prerequisites: {
    modules: string[];
    knowledge: string[];
  };
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type TChapter = {
  id: string;
  module_id: string;
  title: string;
  description: string;
  duration_minutes: number;
  type: "video" | "text" | "quiz" | "practice";
  content: {
    video_url?: string;
    text_content?: string;
    attachments?: {
      name: string;
      url: string;
      size: string;
      type: string;
    }[];
  };
  created_at: string;
  updated_at: string;
  order: number;
  is_active: boolean;
};

export type TModuleAttempt = {
  id: string;
  user_id: string;
  module_id: string;
  start_time: string;
  last_accessed: string;
  time_spent: string;
  status: "not_started" | "in_progress" | "completed";
  progress_percentage: number;
  completed_chapters: string[];
  points_earned: number;
};

export interface IModuleResults {
  totalPoints: number;
  completedChapters: number;
  timeSpent: string;
  progress: number;
}

export interface IUpdateModuleProgressParams {
  userId: string;
  moduleId: string;
  chapterId: string;
  timeSpent: string;
  moduleData: TModule;
}
