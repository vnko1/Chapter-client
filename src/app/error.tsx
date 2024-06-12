"use client";
import React from "react";
import Link from "next/link";

import { Header } from "./ui";
import styles from "./app.module.scss";

function Error() {
  return (
    <>
      <Header showLogo />
      <section className={styles["error"]}>
        <div className={`${styles["error__container"]} ${styles["error"]}`}>
          <h1 className={`${styles["error__title"]} ${styles["title"]}`}>
            Oh no! Something went wrong!
          </h1>
          <div className={styles["error__link"]}>
            <Link className="link" href="/">
              Go to home page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Error;
