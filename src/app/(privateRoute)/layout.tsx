import React, { ReactNode } from "react";
import { NavigationTogglerProvider, ProfileProvider } from "@/context";
import { ProfileHeader, SidebarNavigation } from "./ui";
import styles from "./privateLayout.module.scss";

function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <div className={styles["profile-layout"]}>
        <NavigationTogglerProvider>
          <SidebarNavigation />
          <ProfileHeader />
        </NavigationTogglerProvider>
        <main>{children}</main>
      </div>
    </ProfileProvider>
  );
}

export default PrivateLayout;
