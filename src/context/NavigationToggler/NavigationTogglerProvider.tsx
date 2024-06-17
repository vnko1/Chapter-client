"use client";
import { useState, useEffect } from "react";

import { NavigationTogglerStateContext } from "./hook";
import { NavigationTogglerContextProps } from "./NavigationTogglerProvider.type";

const navActiveClassName = "nav-active";

export default function NavigationTogglerProvider({
  children,
  ...props
}: NavigationTogglerContextProps) {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  useEffect(() => {
    if (isActiveMenu) {
      document.body.classList.add(navActiveClassName);
    } else {
      document.body.classList.remove(navActiveClassName);
    }

    return () => {
      document.body.classList.remove(navActiveClassName);
    };
  }, [isActiveMenu]);

  return (
    <NavigationTogglerStateContext.Provider
      value={{ ...props, isActiveMenu, setIsActiveMenu }}
    >
      {children}
    </NavigationTogglerStateContext.Provider>
  );
}
