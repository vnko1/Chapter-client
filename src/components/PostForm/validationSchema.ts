import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/utils";

export const postSchema = z
  .object({
    title: z
      .string()
      .max(
        100,
        "The length of characters should not exceed 100 characters long."
      )
      .optional(),
    text: z
      .string()
      .max(
        500,
        "The length of characters should not exceed 500 characters long."
      )
      .optional(),
    image: z
      .any()
      .refine((image) => {
        if (image === null) return true;
        return image.size <= MAX_FILE_SIZE;
      }, `Max image size is 3MB.`)
      .refine((image) => {
        if (image === null) return true;
        return ACCEPTED_IMAGE_TYPES.includes(image.type);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported.")
      .optional(),
  })
  .refine(
    (data) => {
      const { title, text, image } = data;
      return (
        (title && title.trim() !== "") ||
        (text && text.trim() !== "") ||
        image !== null
      );
    },

    {
      message: "At least one field must be provided.",
      path: [],
    }
  );
export type FormValues = z.infer<typeof postSchema>;
