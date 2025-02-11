import { TUsers } from "./users";

export type TFeedback = {
  id: string;
  user: TUsers;
  satisfaction: "very-satisfied" | "satisfied" | "neutral" | "unsatisfied";
  aspects: string[];
  feedback: string;
  created_at: string;
  updated_at: string;
};
