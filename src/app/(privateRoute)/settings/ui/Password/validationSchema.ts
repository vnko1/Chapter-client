import { z } from "zod";
import { baseValidation } from "@/utils";

export const passwordSchema = z
  .object({
    password: z.string({ required_error: "Old password is required" }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .regex(
        baseValidation,
        "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
      )
      .min(
        8,
        "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
      )
      .max(
        30,
        "Password must be at least 8 characters, including uppercase letters, one number and Latin letters only. Space symbol is not included."
      )
      .trim(),

    confirmNewPassword: z
      .string({
        required_error: "Confirm Password is required",
      })
      .trim(),
  })
  .refine((data) => data.password !== data.newPassword, {
    path: ["password"],
    message: "Old and new passwords must not match.",
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });
export type FormValues = z.infer<typeof passwordSchema>;
