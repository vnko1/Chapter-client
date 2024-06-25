import { ModalType, SearchResponse } from "@/types";
import { UseFormReset } from "react-hook-form";

export type SearchResultProps = {
  searchResult: SearchResponse | null;
  query: string;
  reset: UseFormReset<{ query: string }>;
} & ModalType;
