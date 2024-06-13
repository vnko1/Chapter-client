import { z } from "zod";

const otpSchema = z.object({
  otp: z.string({
    required_error: "Otp is required",
  }),
});

const emailSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});

export const validationSchema = (type: "email" | "otp") => {
  if (type === "otp") return otpSchema;
  return emailSchema;
};

type OtpSchemaType = z.infer<typeof otpSchema>;
type EmailSchemaType = z.infer<typeof emailSchema>;

export type FormValues = OtpSchemaType | EmailSchemaType;
