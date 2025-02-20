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
  knowledge?: string[];
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type TModule = {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration: number;
  points: number;
  prerequisites: string[];
  video: {
    url: string;
    thumbnail: string;
    duration: string;
  };
  reading: {
    sections: {
      title: string;
      content: string;
    }[];
    resources: {
      name: string;
      size: string;
      link: string;
    }[];
  };
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type TModuleAttempt = {
  id: string;
  user_id: string;
  module_id: string;
  course_id: string;
  start_time: string;
  completion_time?: string;
  last_accessed: string;
  time_spent: string;
  status: "not_started" | "in_progress" | "completed";
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
