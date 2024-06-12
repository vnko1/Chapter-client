import Link from "next/link";
import { Header } from "./ui";

import styles from "./app.module.scss";

export default function NotFound() {
  return (
    <>
      <Header showLogo />
      <main>
        <section className={styles["error"]}>
          <div
            className={`${styles["error__container"]} ${styles["not-found"]}`}
          >
            <h1 className={`${styles["error_title"]} ${styles["title"]}`}>
              Oh no! Page not found
            </h1>
            <p className={`${styles["error__text"]} ${styles["text"]}`}>
              Sorry, we couldn`t find the page you are looking for.
            </p>
            <div className={styles["error__link"]}>
              <Link className="link" href="/">
                Go to home page
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
