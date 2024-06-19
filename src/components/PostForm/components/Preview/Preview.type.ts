import { PostFormProps } from "../../PostForm.type";
import { FormValues } from "../../validationSchema";

export type PreviewProps = { values: FormValues } & Pick<
  PostFormProps,
  "postId"
>;
