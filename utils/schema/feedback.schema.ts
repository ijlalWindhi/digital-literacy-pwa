import * as z from "zod";

import { aspectOptions } from "@/features/feedback/components/FeedbackForm";

export const feedbackSchema = z.object({
  satisfaction: z.enum(["Sangat Puas", "Puas", "Netral", "Tidak Puas"], {
    required_error: "Silakan pilih tingkat kepuasan Anda",
  }),
  aspects: z.array(z.enum(aspectOptions)).min(1, {
    message: "Pilih minimal satu aspek",
  }),
  feedback: z.string().min(10, {
    message: "Feedback harus minimal 10 karakter",
  }),
});
