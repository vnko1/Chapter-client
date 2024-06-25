import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { LinksEnum } from "@/types";

import { PostProps } from "./Post.type";
import styles from "./Post.module.scss";

const Post: FC<PostProps> = (props) => {
  return (
    <Link className={styles["link"]} href={LinksEnum.POST + "/" + props.postId}>
      {props.imageUrl && (
        <Image
          alt="post"
          src={props.imageUrl}
          width={52}
          height={52}
          className={styles["image"]}
        />
      )}
      <p className={styles["title"]}>{props.title}</p>
    </Link>
  );
};

export default Post;
