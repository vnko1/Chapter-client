import React, { FC } from "react";

import { Post, User } from "..";
import { SearchResultProps } from "./SearchResult.type";
import styles from "./SearchResult.module.scss";

const SearchResult: FC<SearchResultProps> = ({ searchResult }) => {
  const { users, posts, books } = searchResult;

  if (!users.count && !posts.count && !books.count)
    return (
      <>
        <p className={styles["title"]}>Result</p>
        <p className={styles["text"]}>Nothing found.</p>
      </>
    );

  const renderUsersRes = users.count ? (
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

  const renderPostsRes = posts.count ? (
    <>
      <p className={styles["title"]}>Users</p>
      <ul className={styles["list"]}>
        {posts.rows.map((el, id) => (
          <li key={id}>
            <Post {...el} />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  return (
    <>
      {renderUsersRes}
      {renderPostsRes}
    </>
  );
};

export default SearchResult;
