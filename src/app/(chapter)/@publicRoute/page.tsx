import React from "react";

import { WelcomePageImage, WelcomePagePanel } from "./ui";

import styles from "./publicRoute.module.scss";

function WelcomePage() {
  return (
    <section className={styles["wrapper"]}>
      <div className={styles["welcome-page-container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </section>
  );
}

export default WelcomePage;
