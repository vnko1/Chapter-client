"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import { LinksEnum } from "@/types";
import { Logo } from "@/components";

import { LogoProps } from "./Header.type";
import styles from "./Header.module.scss";

const Header: FC<LogoProps> = ({ showLogo = false }) => {
  const pathname = usePathname();
  return (
    <header className={styles["header"]}>
      <div className={styles["header__container"]}>
        {pathname !== LinksEnum.HOME || showLogo ? (
          <Logo alt="chapter" />
        ) : null}
      </div>
    </header>
  );
};

export default Header;
