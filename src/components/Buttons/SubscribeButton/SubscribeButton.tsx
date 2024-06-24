import { FC } from "react";
import cn from "classnames";

import { SubscribeButtonProps } from "./SubscribeButton.type";
import styles from "./SubscribeButton.module.scss";

const SubscribeButton: FC<SubscribeButtonProps> = ({
  children,
  isDisabled = false,
  className,
  variant = "contained",
  type = "button",
  handleClick,
  isLoading,
  ...props
}) => {
  const classnames = cn(
    styles["button"],
    {
      [styles["loading"]]: isLoading,
      [styles["contained"]]: variant === "contained",
      [styles["outlined"]]: variant === "outlined",
    },
    className
  );
  const onClick = () => {
    handleClick && handleClick();
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames}
      disabled={isLoading || isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default SubscribeButton;
