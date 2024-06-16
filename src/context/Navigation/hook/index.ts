"use client";
import { createContext, useContext } from "react";

import {
  NavigationContextProps,
  NavigationState,
} from "../NavigationProvider.type";

const initialNavigationState: NavigationState = {
  isActiveMenu: false,
};

export const NavigationStateContext = createContext<NavigationContextProps>(
  initialNavigationState
);

export function useNavigation() {
  const context = useContext(NavigationStateContext);
  if (!context) {
    throw new Error(
      "useNavigation must be used within a NavigationTogglerProvider"
    );
  }
  return context;
}
