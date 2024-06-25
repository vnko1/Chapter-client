import { IBook } from "@/types";

export type BookProps = {
  classNames?: string;
  type?: "page" | "popup";
} & IBook;
