import React from "react";
import styles from "./search.module.scss";
import { RecentData, Search } from "./ui";
import { querySearch } from "@/lib/actions";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query?: string };
}) => {
  const res = await querySearch(searchParams);
  console.log("🚀 ~ res:", res);
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Search</h1>
        <Search query={searchParams.query} />
        <RecentData query={searchParams.query} />
      </div>
    </section>
  );
};

export default SearchPage;
