import React, { ReactNode } from "react";

import { NavigationProvider } from "@/context";

import { Header, SidebarNavigation } from "./ui";
import styles from "./terms.module.scss";

function TermsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationProvider>
        <SidebarNavigation />
        <Header />
      </NavigationProvider>
      <section className={styles["terms"]}>
        <div className={styles["terms__container"]}>
          <h1 className={styles["title"]}>
            Terms & Conditions and Privacy Policy
          </h1>
          {children}
        </div>
      </section>
    </>
  );
}

export default TermsLayout;
