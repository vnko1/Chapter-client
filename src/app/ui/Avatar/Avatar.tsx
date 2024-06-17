import { FC } from "react";
import cn from "classnames";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";
import Image from "next/image";

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
        src={src}
        alt={alt}
        className={styles["user-avatar__image"]}
        onClick={onHandleClick}
        id="avatar"
      />
    </div>
  );
};

export default Avatar;
