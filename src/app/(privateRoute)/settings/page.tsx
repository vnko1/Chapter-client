import React from "react";
import { FullName, Layout, User, Location, Password } from "./ui";
import styles from "./settings.module.scss";

function SettingsPage() {
  return (
    <section className={styles["section"]}>
      <div className={styles["container"]}>
        <User />
        <Layout title="Personal Info" fullWidth>
          <FullName />
        </Layout>
        <Layout title="Location" fullWidth>
          <Location />
        </Layout>
        <Layout title="Update password" fullWidth>
          <Password />
        </Layout>
      </div>
    </section>
  );
}

export default SettingsPage;
