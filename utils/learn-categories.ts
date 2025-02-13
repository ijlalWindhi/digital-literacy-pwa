import { Book, Smartphone, Code, Shield } from "lucide-react";
import { TLearnCategoryMetadata } from "@/types";

export const LEARN_CATEGORIES: TLearnCategoryMetadata[] = [
  {
    id: "konsep-dasar",
    icon: Book,
    title: "Konsep Dasar",
    description: "Uji pemahaman tentang konsep dasar dunia digital",
    modulCount: 0,
    color: "bg-blue-500",
    difficulty: "Pemula",
    total_points: 0,
  },
  {
    id: "pengembangan-web",
    icon: Code,
    title: "Pengembangan Web",
    description: "Latihan praktis pembuatan website",
    modulCount: 0,
    color: "bg-purple-500",
    difficulty: "Lanjutan",
    total_points: 0,
  },
  {
    id: "pengembangan-mobile",
    icon: Smartphone,
    title: "Pengembangan Mobile",
    description: "Tes pengetahuan tentang pengembangan aplikasi mobile",
    modulCount: 0,
    color: "bg-green-500",
    difficulty: "Menengah",
    total_points: 0,
  },
  {
    id: "dev-sec",
    icon: Shield,
    title: "Development Security",
    description: "Tes pengetahuan tentang keamanan dalam pengembangan aplikasi",
    modulCount: 0,
    color: "bg-orange-500",
    difficulty: "Menengah",
    total_points: 0,
  },
];
