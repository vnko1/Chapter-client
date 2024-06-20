"use client";
import { FC } from "react";
import Image from "next/image";
import cn from "classnames";

import { logout } from "@/lib/session";
import { Popup } from "@/components";
import { useModal } from "@/hooks";
import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { default_avatar } from "@/utils";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

const Avatar: FC<AvatarProps> = ({ src, alt, size = "small", classNames }) => {
  const popup = useModal();
  const { setActive } = popup;
  const onHandleClick = () => {
    setActive(true);
  };

  return (
    <div className="relative">
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
      <Popup {...popup} classNames={styles["popup"]}>
        <div className={styles["popup__content"]}>
          <button onClick={async () => await logout()}>
            Log out of profile
          </button>
          <button
            onClick={async () => await privateApi.delete(EndpointsEnum.Profile)}
          >
            Delete user account
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Avatar;
