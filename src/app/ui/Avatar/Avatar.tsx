"use client";
import { FC } from "react";
import Image from "next/image";

import { logout } from "@/lib/session";
import { Popup } from "@/components";
import { useModal } from "@/hooks";
import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { default_avatar } from "@/utils";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

const Avatar: FC<AvatarProps> = ({ src, alt, classNames }) => {
  const popup = useModal();
  const { setActive } = popup;
  const onHandleClick = () => {
    setActive(true);
  };

  return (
    <div className="relative">
      <div className={`${styles["avatar"]} ${classNames}`}>
        <Image
          src={src ? src : default_avatar}
          alt={alt}
          className={styles["avatar__image"]}
          fill
          onClick={onHandleClick}
          id="avatar"
          style={{ objectFit: "cover" }}
        />
      </div>
      <Popup {...popup} classNames={styles["popup"]}>
        <div className={styles["popup__content"]}>
          <button onClick={async () => await logout()}>
            Log out of profile
          </button>
          <button
            onClick={async () => {
              await privateApi.delete(EndpointsEnum.Profile);
              logout();
            }}
          >
            Delete user account
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Avatar;
