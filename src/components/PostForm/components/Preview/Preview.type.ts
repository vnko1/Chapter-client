import { Dispatch, SetStateAction } from "react";
import { PostFormProps } from "../../PostForm.type";
import { FormValues } from "../../validationSchema";

export type PreviewProps = {
  values: FormValues;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
} & Pick<PostFormProps, "postId">;
