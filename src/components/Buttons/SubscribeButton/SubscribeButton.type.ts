import { ButtonHTMLAttributes, ReactNode } from "react";

export interface SubscribeButtonProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  children: ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  classNames?: string;
  variant?: "outlined" | "contained";
  type?: "submit" | "button";
  handleClick?: () => void;
}
