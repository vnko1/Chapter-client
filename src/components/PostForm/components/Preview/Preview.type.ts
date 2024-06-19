import { Dispatch, SetStateAction } from "react";
import { PostFormProps } from "../../PostForm.type";
import { FormValues } from "../../validationSchema";
import { UseFormReset } from "react-hook-form";

export type PreviewProps = {
  values: FormValues;
  reset: UseFormReset<FormValues>;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
} & Pick<PostFormProps, "postId" | "close">;
