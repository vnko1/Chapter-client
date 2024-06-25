import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LinksEnum } from "@/types";

import { BookProps } from "./Book.type";
import styles from "./Book.module.scss";

const Book: FC<BookProps> = (props) => {
  return (
    <Link
      className={styles["link"]}
      href={LinksEnum.PROFILE + "/" + props.userId}
    >
      <Image
        alt="post"
        src={props.imageUrl}
        width={52}
        height={52}
        className={styles["image"]}
      />
      <p className={styles["title"]}>{props.bookName}</p>
    </Link>
  );
};

export default Book;
