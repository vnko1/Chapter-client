"use client";
import { useState, useEffect, FC } from "react";

import { NavigationStateContext } from "./hook";
import { NavigationContextProps } from "./NavigationProvider.type";

const navActiveClassName = "nav-active";

const NavigationProvider: FC<NavigationContextProps> = ({
  children,
  ...props
}) => {
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
};

export default NavigationProvider;
