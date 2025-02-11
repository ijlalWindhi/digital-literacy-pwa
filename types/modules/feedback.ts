import { TUsers } from "./users";

export type TFeedback = {
  id: string;
  user: TUsers;
  satisfaction: "Sangat Puas" | "Puas" | "Netral" | "Tidak Puas";
  aspects: string[];
  feedback: string;
  created_at: string;
  updated_at: string;
};

export type TFeedbackForm = {
  satisfaction: TFeedback["satisfaction"];
  aspects: TFeedback["aspects"];
  feedback: TFeedback["feedback"];
};

export type TFeedbackPayload = {
  user: TUsers;
  satisfaction: TFeedback["satisfaction"];
  aspects: TFeedback["aspects"];
  feedback: TFeedback["feedback"];
  created_at: TFeedback["created_at"];
  updated_at: TFeedback["updated_at"];
};
