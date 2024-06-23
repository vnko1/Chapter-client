import React from "react";
import styles from "./search.module.scss";
import { Search } from "./ui";

const SearchPage = ({ searchParams }: { searchParams: { query?: string } }) => {
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <h1 className={styles["title"]}>Search</h1>
        <Search query={searchParams.query} />
      </div>
    </section>
  );
};

export default SearchPage;
