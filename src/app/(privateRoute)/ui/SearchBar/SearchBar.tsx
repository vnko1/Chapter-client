"use client";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { SearchField } from "@/components";

import styles from "./SearchBar.module.scss";
import { SearchBarProps } from "./SearchBar.type";

const SearchBar: FC<SearchBarProps> = ({ classNames }) => {
  const { control } = useForm({ defaultValues: { query: "" } });
  const handleSearch = useDebouncedCallback((term: string) => {
    console.log("🚀 ~ handleSearch ~ term:", term);
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
    </div>
  );
};

export default SearchBar;
