"use client";
import React, { FC, useEffect } from "react";
import cn from "classnames";

import { PopupProps } from "./Popup.type";
import styles from "./Popup.module.scss";

const Popup: FC<PopupProps> = ({
  children,
  active,
  visible,
  activeClassNames,
  classNames,
  setVisible,
  close,
}) => {
  useEffect(() => {
    active && setVisible(true);
  }, [active, setVisible]);

  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      if (e.code === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
  }, [close]);

  const popupClassNames = cn(styles["popup"], classNames, {
    [styles["active"]]: visible,
    [activeClassNames || ""]: visible,
  });

  if (!active) return null;
  return <div className={popupClassNames}>{children}</div>;
};

export default Popup;
