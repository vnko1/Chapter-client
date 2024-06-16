"use client";
import { useState, useEffect } from "react";

import { NavigationStateContext } from "./hook";
import { NavigationContextProps } from "./NavigationProvider.type";

const navActiveClassName = "nav-active";

export default function NavigationProvider({
  children,
  ...props
}: NavigationContextProps) {
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
    <NavigationStateContext.Provider
      value={{ ...props, isActiveMenu, setIsActiveMenu }}
    >
      {children}
    </NavigationStateContext.Provider>
  );
}
