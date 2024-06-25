import { ModalType, SearchResponse } from "@/types";

export type SearchResultProps = {
  searchResult: SearchResponse | null;
} & ModalType;
