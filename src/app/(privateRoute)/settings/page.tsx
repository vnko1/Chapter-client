import React from "react";
import { User } from "./ui";
import styles from "./settings.module.scss";

function SettingsPage() {
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <User />
      </div>
    </section>
  );
}

export default SettingsPage;
