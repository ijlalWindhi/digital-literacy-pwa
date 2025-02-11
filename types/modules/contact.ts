export type TContactSubject = "pembelajaran" | "quiz" | "forum" | "other";

export type TContact = {
  id: string;
  name: string;
  email: string;
  subject: TContactSubject;
  message: string;
  created_at: string;
  updated_at: string;
  status: "pending" | "responded" | "closed";
};

export type TContactForm = Omit<
  TContact,
  "id" | "created_at" | "updated_at" | "status"
>;
