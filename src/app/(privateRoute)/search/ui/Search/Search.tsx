"use client";
import React, { FC } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { SearchField } from "@/components";
import { SearchProps } from "./Search.type";
import styles from "./Search.module.scss";

const Search: FC<SearchProps> = ({ query }) => {
  const { control } = useForm({ values: { query: query || "" } });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set("query", term) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <SearchField
      control={control}
      placeholder="Find your friends here"
      handleSearch={handleSearch}
      classNames={styles["search"]}
    />
  );
};

export default Search;
