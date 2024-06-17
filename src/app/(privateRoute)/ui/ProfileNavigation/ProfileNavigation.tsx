import { FC } from "react";

import { ProfileNavigationProps } from "./ProfileNavigation.type";
import { navigation, bottomNavigation } from "./ProfileNavigation.data";

import { NavigationList } from "..";

import styles from "./ProfileNavigation.module.scss";

const ProfileNavigation: FC<ProfileNavigationProps> = (props) => {
  return (
    <nav className={styles["profile-navigation"]}>
      <NavigationList
        className={styles["profile-navigation__top-nav-list"]}
        items={navigation}
        {...props}
      />
      <NavigationList
        className={styles["profile-navigation__bottom-nav-list"]}
        items={bottomNavigation}
        isBottom
        {...props}
      />
    </nav>
  );
};

export default ProfileNavigation;
