import { Book, Smartphone, Code, Shield } from "lucide-react";
import { TForumCategoryMetadata } from "@/types";

export const FORUM_CATEGORIES: TForumCategoryMetadata[] = [
  {
    id: "konsep-dasar",
    icon: Book,
    title: "Konsep Dasar",
    description: "Diskusi tentang konsep dasar literasi digital",
    threads: 0,
    color: "bg-blue-500",
  },
  {
    id: "pengembangan-mobile",
    icon: Smartphone,
    title: "Pengembangan Mobile",
    description: "Diskusi seputar pengembangan aplikasi mobile",
    threads: 0,
    color: "bg-green-500",
  },
  {
    id: "pengembangan-web",
    icon: Code,
    title: "Pengembangan Web",
    description: "Diskusi seputar pembuatan website",
    threads: 0,
    color: "bg-purple-500",
  },
  {
    id: "dev-sec",
    icon: Shield,
    title: "Development Security",
    description: "Keamanan dalam pengembangan aplikasi",
    threads: 0,
    color: "bg-orange-500",
  },
];
