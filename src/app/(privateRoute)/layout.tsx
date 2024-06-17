import React, { ReactNode } from "react";
import { NavigationTogglerProvider, ProfileProvider } from "@/context";
import styles from "./privateLayout.module.scss";
import { SidebarNavigation } from "./ui";

function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <div className={styles["profile-layout"]}>
        <NavigationTogglerProvider>
          <SidebarNavigation />
        </NavigationTogglerProvider>
        <main>{children}</main>
      </div>
    </ProfileProvider>
  );
}

export default PrivateLayout;
