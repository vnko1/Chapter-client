import { z } from "zod";

export const forgotSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .email()
    .trim(),
});

export type FormValues = z.infer<typeof forgotSchema>;
