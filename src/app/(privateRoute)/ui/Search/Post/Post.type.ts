import { IPost } from "@/types";

export type PostProps = {
  classNames?: string;
  type?: "page" | "popup";
} & IPost;
