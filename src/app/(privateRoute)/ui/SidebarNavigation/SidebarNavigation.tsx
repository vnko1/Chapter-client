"use client";
import { FC } from "react";
import cn from "classnames";

import { useNavigationToggler } from "@/context";
import { Logo } from "@/components";

import { ProfileNavigation } from "..";

import { SidebarNavigationProps } from "./SidebarNavigation.type";
import styles from "./SidebarNavigation.module.scss";

const SidebarNavigation: FC<SidebarNavigationProps> = (props) => {
  const { isActiveMenu } = useNavigationToggler();
  return (
    <div
      className={cn(styles["sidebar-navigation"], {
        [styles["active"]]: isActiveMenu,
      })}
    >
      <div className={styles["sidebar-navigation__logo"]}>
        <Logo classNames="max-w-[280px]" />
      </div>
      <ProfileNavigation {...props} />
    </div>
  );
};

export default SidebarNavigation;
