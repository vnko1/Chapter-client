import React from "react";
import { SearchResponse } from "@/types";
import { querySearch } from "@/lib/actions";
import { RecentData, Search, SearchResult } from "./ui";
import styles from "./search.module.scss";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const res: SearchResponse | null = await querySearch(searchParams);

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Search</h1>
        <Search query={searchParams.query} />
        {!res ? (
          <RecentData query={searchParams.query} />
        ) : (
          <SearchResult searchResult={res} />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
