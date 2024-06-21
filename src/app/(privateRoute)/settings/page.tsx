import React from "react";
import { FullName, Layout, User } from "./ui";
import styles from "./settings.module.scss";

function SettingsPage() {
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <User />
        <Layout title="Personal Info" fullWidth>
          <FullName />
        </Layout>
      </div>
    </section>
  );
}

export default SettingsPage;
