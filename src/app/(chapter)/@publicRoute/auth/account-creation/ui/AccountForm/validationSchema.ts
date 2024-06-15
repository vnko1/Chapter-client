import { z } from "zod";
import { baseValidation, nickNameCharsRegex, simpleStringRegex } from "@/utils";

export const accountSchema = z
  .object({
    fullName: z
      .string({
        required_error: "Please enter a valid name.",
      })
      .min(5, "Full Name must be at least 5 characters long.")
      .max(80, "Full Name must be at least 5 characters long.")
      .regex(
        /^[^\s]+\s[^\s]+$/,
        "Full name field must contain first and second names separated by a space symbol"
      )
      .regex(
        simpleStringRegex,
        "Full name field cannot contain any special symbols or numbers"
      )
      .trim(),

    nickName: z
      .string({
        required_error: "Please enter a valid Nickname",
      })
      .regex(nickNameCharsRegex, "Please enter a valid Nickname")
      .min(3, "Please enter a valid Nickname")
      .max(30, "Please enter a valid Nickname")
      .trim(),

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

export type FormValues = z.infer<typeof accountSchema>;
