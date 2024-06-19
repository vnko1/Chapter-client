import { IUser, ModalType } from "@/types";

export type PostFormProps = {
  user: IUser | null;
  postId?: string;
  title?: string;
  text?: string;
  imageUrl?: string | null;
} & ModalType;
