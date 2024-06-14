"use client";

import { useState } from "react";

export const useModal = () => {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
    setTimeout(() => {
      setActive(false);
    }, 300);
  };

  return { active, visible, setActive, setVisible, close };
};
