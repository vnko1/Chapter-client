"use client";
import React, { FC } from "react";

import { Popup } from "@/components";

import { User, Post, Book } from "..";
import { SearchResultProps } from "./SearchResult.type";
import styles from "./SearchResult.module.scss";

const SearchResult: FC<SearchResultProps> = ({ searchResult, ...props }) => {
  if (!searchResult) return null;

  const { users, posts, books } = searchResult;

  const notFound = (
    <>
      <p className={styles["title"]}>Result</p>
      <p className={styles["text"]}>Nothing found.</p>
    </>
  );

  const renderUsersRes = users.count ? (
    <>
      <p className={styles["title"]}>Users</p>
      <ul className={styles["list"]}>
        {users.rows.slice(2).map((el, id) => (
          <li key={id}>
            <User {...el} type="popup" />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  const renderPostsRes = posts.count ? (
    <>
      <p className={styles["title"]}>Posts</p>
      <ul className={styles["list"]}>
        {posts.rows.slice(2).map((el, id) => (
          <li key={id}>
            <Post {...el} type="popup" />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  const renderBooksRes = books.count ? (
    <>
      <p className={styles["title"]}>Books</p>
      <ul className={styles["list"]}>
        {books.rows.slice(2).map((el, id) => (
          <li key={id}>
            <Book {...el} type="popup" />
          </li>
        ))}
      </ul>
    </>
  ) : null;

  return (
    <Popup {...props} classNames={styles["popup"]}>
      <>
        {!users.count && !posts.count && !books.count ? (
          notFound
        ) : (
          <>
            {renderUsersRes}
            {renderPostsRes}
            {renderBooksRes}
          </>
        )}
      </>
    </Popup>
  );
};

export default SearchResult;
