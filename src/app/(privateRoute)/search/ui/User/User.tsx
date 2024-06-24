import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LinksEnum } from "@/types";
import { default_avatar } from "@/utils";

import { UserProps } from "./User.type";
import styles from "./User.module.scss";
import { Subscribe } from "@/app/ui";

const User: FC<UserProps> = (props) => {
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
        <span className={styles["nickname"]}>{props.nickName}</span>
      </Link>
      <Subscribe userId={props.userId} imageUrl={props.avatarUrl} />
    </>
  );
};

export default User;
