"use client";
import { createContext, useContext } from "react";
import {
  NavigationTogglerContextProps,
  NavigationTogglerState,
} from "../NavigationTogglerProvider.type";

const initialNavigationTogglerState: NavigationTogglerState = {
  isActiveMenu: false,
};

export const NavigationTogglerStateContext =
  createContext<NavigationTogglerContextProps>(initialNavigationTogglerState);

export function useNavigationToggler() {
  const context = useContext(NavigationTogglerStateContext);
  if (!context) {
    throw new Error(
      "useNavigationToggler must be used within a NavigationTogglerProvider"
    );
  }
  return context;
}
