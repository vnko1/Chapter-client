"use client";

import { FC, useState, useEffect } from "react";

import { IconEnum } from "@/types";
import { Icon, UIButton } from "@/components";

import { MenuTogglerProps } from "./MenuToggler.type";
import styles from "./MenuToggler.module.scss";

const MenuToggler: FC<MenuTogglerProps> = ({
  isActive = false,
  classNames,
  onClick,
}) => {
  const [activeState, setActiveState] = useState(false);

  useEffect(() => {
    setActiveState(isActive);
  }, [isActive]);

  function handleClick() {
    const updatedValue = !activeState;
    setActiveState(updatedValue);
    onClick(updatedValue);
  }

  return (
    <UIButton
      classNames={`${styles["menu-toggler"]} ${classNames}`}
      onClick={handleClick}
      variant="text"
      aria-label="Toggler button"
    >
      <Icon
        icon={activeState ? IconEnum.Cross : IconEnum.Menu}
        className={styles["menu-toggler__icon"]}
        color="#000000"
      />
    </UIButton>
  );
};

export default MenuToggler;
