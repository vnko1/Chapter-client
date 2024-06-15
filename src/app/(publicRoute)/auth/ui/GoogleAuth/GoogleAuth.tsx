import React, { FC } from "react";
import { Icon, UIButton } from "@/components";
import { GoogleAuthProps } from "./GoogleAuth.type";
import styles from "./GoogleAuth.module.scss";
import { IconEnum, OuterLinksEnum } from "@/types";

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
      classNames={`${styles["oauth-btn"]} ${classNames}`}
      fullWidth
      variant={buttonVariant}
      color={buttonColor}
      size={buttonSize}
      aria-label="Google oAuth button"
      href={OuterLinksEnum.GOOGLE_CB}
    >
      <Icon icon={IconEnum.Google} size={iconSize} />
      <span>{text}</span>
    </UIButton>
  );
};

export default GoogleAuth;
