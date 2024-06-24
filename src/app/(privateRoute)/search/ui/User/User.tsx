import React, { FC } from "react";
import { UserProps } from "./User.type";
import styles from "./User.module.scss";
import Link from "next/link";
import { LinksEnum } from "@/types";

const User: FC<UserProps> = (props) => {
  console.log("🚀 ~ props:", props);
  return (
    <Link
      href={LinksEnum.PROFILE + "/" + props.userId}
      className={styles["link"]}
    >
      User
    </Link>
  );
};

export default User;
