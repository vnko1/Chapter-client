import { FC } from "react";
import Image from "next/image";
import cn from "classnames";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

import default_avatar from "@/assets/svg/default_avatar.svg";

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = "small",
  classNames,
  onClick,
}) => {
  const onHandleClick = () => {
    onClick && onClick();
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
    </div>
  );
};

export default Avatar;
