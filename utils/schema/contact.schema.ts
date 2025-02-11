import * as z from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus minimal 2 karakter",
  }),
  email: z.string().email({
    message: "Email tidak valid",
  }),
  subject: z.enum(["pembelajaran", "quiz", "forum", "other"], {
    required_error: "Silakan pilih topik",
  }),
  message: z.string().min(10, {
    message: "Pesan harus minimal 10 karakter",
  }),
});
