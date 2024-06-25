"use client";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { SearchField } from "@/components";
import { useModal } from "@/hooks";
import { CustomError } from "@/services";
import { querySearch } from "@/lib/actions";
import { SearchResponse } from "@/types";

import { SearchResult } from "..";
import { ResponseType, SearchBarProps } from "./SearchBar.type";
import styles from "./SearchBar.module.scss";

const SearchBar: FC<SearchBarProps> = ({ classNames }) => {
  const { control, watch } = useForm({ defaultValues: { query: "" } });
  const popup = useModal();
  const { setActive } = popup;
  const [searchRes, setSearchRes] = useState<SearchResponse | null>(null);

  const handleSearch = useDebouncedCallback(async (term: string) => {
    try {
      const res: ResponseType = await querySearch({ query: term });
      setSearchRes(res?.data || null);
      setActive(true);
    } catch (error) {
      if (error instanceof CustomError) console.log(error);
    }
  }, 300);

  return (
    <div className={styles["search__wrapper"]}>
      <SearchField
        classNames={classNames}
        control={control}
        placeholder="Find your friends here"
        handleSearch={handleSearch}
        autoComplete="off"
      />
      <SearchResult {...popup} searchResult={searchRes} />
    </div>
  );
};

export default SearchBar;
