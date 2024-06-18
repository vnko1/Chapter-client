"use client";
import React, { FC } from "react";
import Image from "next/image";

import { Icon, Modal } from "@/components";
import { IconEnum } from "@/types";

import { CreatePostProps } from "./CreatePost.type";
import styles from "./CreatePost.module.scss";
import default_avatar from "@/assets/svg/default_avatar.svg";

const CreatePost: FC<CreatePostProps> = ({ user, ...props }) => {
  return (
    <Modal
      {...props}
      classNames={styles["modal"]}
      activeClassNames={styles["active"]}
    >
      <div className={styles["body"]}>
        <button className={styles["cross-btn"]} onClick={() => props.close()}>
          <Icon icon={IconEnum.Cross} size={24} />
        </button>
        <div className={styles["body__user"]}>
          <Image
            src={user?.avatarUrl || default_avatar}
            alt="avatar"
            className={styles["avatar"]}
          />
          <p>{user?.nickName}</p>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePost;
