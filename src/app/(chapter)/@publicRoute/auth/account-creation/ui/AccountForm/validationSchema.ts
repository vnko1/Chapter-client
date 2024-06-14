import { z } from "zod";

export const accountSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email(),
    otp: z.string({
      required_error: "Otp is required",
    }),
  })
  .refine((data) => data.email && data.otp !== undefined, {
    message: "Otp is required when email is provided",
    path: ["otp"],
  });

export type FormValues = z.infer<typeof accountSchema>;
