import React, { ReactNode } from "react";
import { NavigationTogglerProvider, ProfileProvider } from "@/context";
import styles from "./privateLayout.module.scss";

function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <div className={styles["profile-layout"]}>
        <NavigationTogglerProvider></NavigationTogglerProvider>
        <main>{children}</main>
      </div>
    </ProfileProvider>
  );
}

export default PrivateLayout;
