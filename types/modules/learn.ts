import { LucideIcon } from "lucide-react";

export type TLearnCategoryMetadata = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  modulCount: number;
  difficulty: string;
  total_points: number;
};
