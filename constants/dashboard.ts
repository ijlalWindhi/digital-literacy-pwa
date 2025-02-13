import type { User, Quiz, ForumPost, LearningModule } from "@/types";

export const topUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/images/unavailable-profile.png",
    points: 15000,
    level: 8,
    completedCourses: 12,
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/images/unavailable-profile.png",
    points: 14200,
    level: 7,
    completedCourses: 10,
  },
  {
    id: "3",
    name: "Emily Davis",
    avatar: "/images/unavailable-profile.png",
    points: 13800,
    level: 7,
    completedCourses: 9,
  },
];

export const popularQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Konsep Dasar Digital",
    category: "Fundamental",
    participants: 1234,
    difficulty: "Pemula",
  },
  {
    id: "2",
    title: "Web Development Basic",
    category: "Development",
    participants: 890,
    difficulty: "Menengah",
  },
  {
    id: "3",
    title: "Mobile App Security",
    category: "Security",
    participants: 567,
    difficulty: "Lanjutan",
  },
];

export const recentForumPosts: ForumPost[] = [
  {
    id: "1",
    title: "Tips Belajar Programming untuk Pemula",
    author: "John Doe",
    replies: 23,
    lastActivity: "2 jam yang lalu",
  },
  {
    id: "2",
    title: "Diskusi Framework Frontend Terpopuler",
    author: "Jane Smith",
    replies: 45,
    lastActivity: "5 jam yang lalu",
  },
  {
    id: "3",
    title: "Tanya Jawab Cloud Computing",
    author: "Alex Wilson",
    replies: 12,
    lastActivity: "1 hari yang lalu",
  },
];

export const latestLearning: LearningModule[] = [
  {
    id: "1",
    title: "Pengenalan Cloud Computing",
    category: "Cloud",
    progress: 75,
    lastAccessed: "2 jam yang lalu",
    totalLessons: 10,
    completedLessons: 7,
  },
  {
    id: "2",
    title: "Dasar-Dasar HTML & CSS",
    category: "Web",
    progress: 40,
    lastAccessed: "1 hari yang lalu",
    totalLessons: 8,
    completedLessons: 3,
  },
  {
    id: "3",
    title: "Mobile App Development",
    category: "Mobile",
    progress: 20,
    lastAccessed: "3 hari yang lalu",
    totalLessons: 12,
    completedLessons: 2,
  },
];
