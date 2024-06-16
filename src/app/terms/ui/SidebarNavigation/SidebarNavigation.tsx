"use client";
import { FC } from "react";
import cn from "classnames";

import { useNavigation } from "@/context";
import { Logo } from "@/components";

import { Navigation } from "..";
import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation: FC = () => {
  const { isActiveMenu } = useNavigation();
  return (
    <div
      className={cn(styles["sidebar-navigation"], {
        [styles["active"]]: isActiveMenu,
      })}
    >
      <div className={styles["sidebar-navigation__logo"]}>
        <Logo classNames="max-w-[280px]" />
      </div>
      <Navigation />
    </div>
  );
};

export default SidebarNavigation;
