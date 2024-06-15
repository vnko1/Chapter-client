import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email()
    .trim(),

  password: z.string({
    required_error: "Password is required",
  }),
});

export type FormValues = z.infer<typeof loginSchema>;
