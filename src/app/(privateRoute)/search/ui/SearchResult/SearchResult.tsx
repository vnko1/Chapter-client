import React, { FC } from "react";

import { User } from "..";
import { SearchResultProps } from "./SearchResult.type";
import styles from "./SearchResult.module.scss";

const SearchResult: FC<SearchResultProps> = ({ searchResult }) => {
  const { users, posts, books } = searchResult;
  console.log("🚀 ~ searchResult:", searchResult);

  if (!users.count && !posts.count && !books.count)
    return (
      <>
        <p className={styles["title"]}>Result</p>
        <p className={styles["text"]}>Nothing found.</p>
      </>
    );

  const renderUserRes = users.count ? (
    <>
      <p className={styles["title"]}>Users</p>
      <ul className={styles["list"]}>
        {users.rows.map((el, id) => (
          <li key={id}>
            <User {...el} />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  return <>{renderUserRes}</>;
};

export default SearchResult;
