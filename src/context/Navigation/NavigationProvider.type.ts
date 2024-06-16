import { Dispatch, ReactNode } from "react";

export type NavigationState = {
  isActiveMenu: boolean;
  setIsActiveMenu?: Dispatch<React.SetStateAction<boolean>>;
};

export type NavigationContextProps = {
  children?: ReactNode;
} & Partial<NavigationState>;
