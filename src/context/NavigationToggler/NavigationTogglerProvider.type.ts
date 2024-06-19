import { Dispatch, ReactNode } from "react";

export type NavigationTogglerState = {
  isActiveMenu: boolean;
  setIsActiveMenu?: Dispatch<React.SetStateAction<boolean>>;
};

export type NavigationTogglerContextProps = {
  children?: ReactNode;
} & Partial<NavigationTogglerState>;
