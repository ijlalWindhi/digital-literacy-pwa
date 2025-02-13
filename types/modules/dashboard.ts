export type User = {
  id: string;
  name: string;
  avatar: string;
  points: number;
  level: number;
  completedCourses: number;
};

export type Quiz = {
  id: string;
  title: string;
  category: string;
  participants: number;
  difficulty: "Pemula" | "Menengah" | "Lanjutan";
};

export type ForumPost = {
  id: string;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
};

export type LearningModule = {
  id: string;
  title: string;
  category: string;
  progress: number;
  lastAccessed: string;
  totalLessons: number;
  completedLessons: number;
};
