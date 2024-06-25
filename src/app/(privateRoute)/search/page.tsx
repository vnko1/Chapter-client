import React from "react";
import { SearchResponse } from "@/types";
import { querySearch } from "@/lib/actions";
import { RecentData, Search, SearchResult } from "./ui";
import styles from "./search.module.scss";

type ResponseType = { data: SearchResponse } | null;

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const res: ResponseType = await querySearch(searchParams);

  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Search</h1>
        <Search query={searchParams.query} />
        {res?.data ? (
          <SearchResult searchResult={res.data} />
        ) : (
          <RecentData query={searchParams.query} />
        )}
      </div>
    </section>
  );
};

export default SearchPage;
