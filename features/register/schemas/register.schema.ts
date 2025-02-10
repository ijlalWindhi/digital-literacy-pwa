import * as z from "zod";

const passwordRequirements = {
  minLength: 8,
  requireLetters: true,
  requireNumbers: true,
  requireSymbols: true,
};

export const RegisterSchema = z
  .object({
    email: z.string().email("Email tidak valid").nonempty("Email wajib diisi"),
    password: z
      .string()
      .nonempty("Password wajib diisi")
      .min(
        passwordRequirements.minLength,
        `Password minimal memiliki ${passwordRequirements.minLength} karakter`,
      )
      .regex(/[A-Za-z]/, "Password harus mengandung setidaknya satu huruf")
      .regex(/[0-9]/, "Password harus mengandung setidaknya satu angka")
      .regex(
        /[^A-Za-z0-9]/,
        "Password harus mengandung setidaknya satu karakter spesial",
      ),
    repeat_password: z.string().nonempty("Konfirmasi Password wajib diisi"),
  })
  .refine((data) => data.password === data.repeat_password, {
    message: "Konfirmasi Password tidak sesuai",
    path: ["repeat_password"],
  });
