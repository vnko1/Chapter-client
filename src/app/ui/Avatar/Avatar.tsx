"use client";
import { FC } from "react";
import Image from "next/image";
import cn from "classnames";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

import default_avatar from "@/assets/svg/default_avatar.svg";
import { Popup } from "@/components";
import { useModal } from "@/hooks";

const Avatar: FC<AvatarProps> = ({ src, alt, size = "small", classNames }) => {
  const popup = useModal();
  const { setActive } = popup;
  const onHandleClick = () => {
    setActive(true);
  };

  return (
    <div
      className={cn(
        styles["user-avatar"],
        {
          [styles["user-avatar--small"]]: size === "small",
          [styles["user-avatar--large"]]: size === "large",
        },
        classNames
      )}
    >
      <Image
        src={src ? src : default_avatar}
        alt={alt}
        className={styles["user-avatar__image"]}
        width={190}
        height={190}
        onClick={onHandleClick}
        id="avatar"
      />
      <Popup {...popup} classNames={styles["popup"]}>
        <div>POPUP</div>
      </Popup>
    </div>
  );
};

export default Avatar;
