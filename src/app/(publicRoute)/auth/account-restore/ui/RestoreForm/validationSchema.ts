import { z } from "zod";

export const restoreSchema = z.object({
  otp: z.string({
    required_error: "Otp is required",
  }),
});

export type RestoreSchemaType = z.infer<typeof restoreSchema>;
