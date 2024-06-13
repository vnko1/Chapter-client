import React, { FC } from "react";
import { Icon, UIButton } from "@/components";
import { GoogleAuthProps } from "./GoogleAuth.type";
import styles from "./GoogleAuth.module.scss";
import { IconEnum } from "@/types";

const GoogleAuth: FC<GoogleAuthProps> = ({
  text = "Enter with google",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  classNames,
}) => {
  return (
    <UIButton
      className={`${styles["oauth-btn"]} ${classNames}`}
      fullWidth
      variant={buttonVariant}
      color={buttonColor}
      size={buttonSize}
      aria-label="Google oAuth button"
      href="/"
    >
      <Icon icon={IconEnum.Google} size={iconSize} />
      <span>{text}</span>
    </UIButton>
  );
};

export default GoogleAuth;
