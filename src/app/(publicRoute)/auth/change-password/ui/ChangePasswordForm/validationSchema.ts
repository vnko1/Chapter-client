import { z } from "zod";
import { baseValidation } from "@/utils";

export const changeSchema = z
  .object({
    password: z
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

    confirm_password: z
      .string({
        required_error: "Confirm Password is required",
      })
      .trim(),
  })
  .refine((data) => data.confirm_password === data.password, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });

export type FormValues = z.infer<typeof changeSchema>;
