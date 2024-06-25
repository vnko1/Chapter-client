"use client";
import React, { FC } from "react";

import { Popup } from "@/components";

import { User, Post, Book } from "..";
import { SearchResultProps } from "./SearchResult.type";
import styles from "./SearchResult.module.scss";

const SearchResult: FC<SearchResultProps> = ({ searchResult, ...props }) => {
  if (!searchResult) return null;

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
    <Popup {...props} classNames={styles["popup"]}>
      <div>
        {renderUsersRes}
        {renderPostsRes}
        {renderBooksRes}
      </div>
    </Popup>
  );
};

export default SearchResult;
