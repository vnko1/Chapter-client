import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LinksEnum } from "@/types";
import { default_avatar } from "@/utils";

import { Subscribe } from "@/app/ui";
import { UserProps } from "./User.type";
import styles from "./User.module.scss";

const User: FC<UserProps> = ({
  showFollowButton = false,
  type = "page",
  ...props
}) => {
  return (
    <>
      <Link
        href={LinksEnum.PROFILE + "/" + props.userId}
        className={styles["link"]}
      >
        <Image
          alt="avatar"
          src={props.avatarUrl || default_avatar}
          width={52}
          height={52}
          className={styles["avatar"]}
        />
        <span className={`${styles["nickname"]} ${styles[type]}`}>
          {props.nickName}
        </span>
      </Link>
      {showFollowButton && (
        <Subscribe userId={props.userId} classNames={styles["button"]} />
      )}
    </>
  );
};

export default User;
