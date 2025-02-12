import type { LucideIcon } from "lucide-react";

export type TForumCategory =
  | "konsep-dasar"
  | "pengembangan-mobile"
  | "pengembangan-web"
  | "dev-sec";

export type TForumCategoryMetadata = {
  id: TForumCategory;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  threads: number;
};

export type TQuizCategoryMetadata = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  quizCount: number;
  difficulty: string;
};

export type TForum = {
  id: string;
  title: string;
  content: string;
  category: TForumCategory;
  author: {
    uid: string;
    name: string;
  };
  likes: number;
  user_likes: string[];
  comments: number;
  views: number;
  created_at: string;
  updated_at: string;
};

export type TForumComment = {
  id: string;
  forum_id: string;
  content: string;
  author: {
    uid: string;
    name: string;
    image: string;
  };
  likes: number;
  user_likes: string[];
  created_at: string;
  updated_at: string;
};

export type TForumForm = Pick<TForum, "title" | "content" | "category">;
export type TForumCommentForm = Pick<TForumComment, "content">;
