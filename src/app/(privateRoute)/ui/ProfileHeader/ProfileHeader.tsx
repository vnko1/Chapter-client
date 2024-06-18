"use client";
import { FC } from "react";

import { useNavigationToggler, useProfileContext } from "@/context";
import { Logo, UIButton } from "@/components";

import { Avatar, MenuToggler } from "@/app/ui";

import { SearchBar } from "..";

import { ProfileHeaderProps } from "./ProfileHeader.type";
import styles from "./ProfileHeader.module.scss";
import TabIcon from "./IconsComoponent/TabIcon";
import Icon from "./IconsComoponent/Icon";

const ProfileHeader: FC<ProfileHeaderProps> = () => {
  const { user } = useProfileContext();
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();

  return (
    <header className={styles["profile-header"]}>
      <div className={styles["profile-header__container"]}>
        <MenuToggler
          isActive={isActiveMenu}
          classNames={styles["profile-header__menu-toggler"]}
          onClick={() => setIsActiveMenu && setIsActiveMenu(!isActiveMenu)}
        />
        <Logo classNames={styles["profile-header__logo-name"]} />
        <div className={styles["profile-header__auth-side"]}>
          <SearchBar classNames={styles["profile-header__search-field"]} />
          <UIButton
            size="small"
            isCustomIcon
            classNames={styles["add-post-button"]}
            aria-label="Open create post modal button"
          >
            <TabIcon />
            Add post
          </UIButton>
          <Avatar
            src={user?.avatarUrl || null}
            alt="user avatar"
            classNames={styles["profile-header__user-avatar"]}
          />
          <UIButton
            size="small"
            variant="text"
            isCustomIcon
            className="md:hidden bg-transparent"
            aria-label="Open create post modal button"
          >
            <Icon />
          </UIButton>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
