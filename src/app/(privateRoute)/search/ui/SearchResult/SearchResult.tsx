import React, { FC } from "react";

import { Book, Post, User } from "@/app/(privateRoute)/ui";
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
            <User {...el} showFollowButton />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  const renderPostsRes = posts.count ? (
    <>
      <p className={styles["title"]}>Posts</p>
      <ul className={styles["list"]}>
        {posts.rows.map((el, id) => (
          <li key={id}>
            <Post {...el} />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  const renderBooksRes = books.count ? (
    <>
      <p className={styles["title"]}>Books</p>
      <ul className={styles["list"]}>
        {books.rows.map((el, id) => (
          <li key={id}>
            <Book {...el} />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  return (
    <>
      {renderUsersRes}
      {renderPostsRes}
      {renderBooksRes}
    </>
  );
};

export default SearchResult;
