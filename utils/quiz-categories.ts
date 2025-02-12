import { Book, Smartphone, Code, Shield } from "lucide-react";
import { TQuizCategoryMetadata } from "@/types";

export const QUIZ_CATEGORIES: TQuizCategoryMetadata[] = [
  {
    id: "konsep-dasar",
    icon: Book,
    title: "Konsep Dasar",
    description: "Uji pemahaman tentang konsep dasar dunia digital",
    quizCount: 0,
    color: "bg-blue-500",
    difficulty: "Pemula",
  },
  {
    id: "pengembangan-mobile",
    icon: Smartphone,
    title: "Pengembangan Mobile",
    description: "Tes pengetahuan tentang pengembangan aplikasi mobile",
    quizCount: 0,
    color: "bg-green-500",
    difficulty: "Menengah",
  },
  {
    id: "pengembangan-web",
    icon: Code,
    title: "Pengembangan Web",
    description: "Latihan praktis pembuatan website",
    quizCount: 0,
    color: "bg-purple-500",
    difficulty: "Lanjutan",
  },
  {
    id: "dev-sec",
    icon: Shield,
    title: "Development Security",
    description: "Tes pengetahuan tentang keamanan dalam pengembangan aplikasi",
    quizCount: 0,
    color: "bg-orange-500",
    difficulty: "Menengah",
  },
];
