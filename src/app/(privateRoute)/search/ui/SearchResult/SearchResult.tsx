import React, { FC } from "react";
import { SearchResultProps } from "./SearchResult.type";

const SearchResult: FC<SearchResultProps> = ({ searchResult }) => {
  console.log("🚀 ~ searchResult:", searchResult);
  return <div>SearchResult</div>;
};

export default SearchResult;
