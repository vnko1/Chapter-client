import { FC } from "react";

import { NavigationList } from "..";

import { navigation, bottomNavigation } from "./Navigation.data";
import styles from "./Navigation.module.scss";

const Navigation: FC = () => {
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        classNames={styles["profile-navigation__top-nav-list"]}
        items={navigation}
      />
      <NavigationList
        classNames={styles["profile-navigation__bottom-nav-list"]}
        items={bottomNavigation}
        isBottom
      />
    </nav>
  );
};

export default Navigation;
