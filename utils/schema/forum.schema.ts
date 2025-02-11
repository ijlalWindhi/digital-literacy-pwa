import * as z from "zod";

export const forumSchema = z.object({
  title: z.string().min(5, "Judul minimal 5 karakter"),
  content: z.string().min(20, "Konten minimal 20 karakter"),
  category: z.enum([
    "konsep-dasar",
    "pengembangan-mobile",
    "pengembangan-web",
    "dev-sec",
  ]),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Konten tidak boleh kosong"),
});
