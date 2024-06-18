import { IUser, ModalType } from "@/types";

export type PostFormProps = {
  user: IUser | null;
  type: "create" | "update";
} & ModalType;
