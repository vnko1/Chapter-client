"use client";
import { FC, MouseEvent, useEffect } from "react";
import { createPortal } from "react-dom";
import cn from "classnames";

import { useSwipe } from "@/hooks";

import { ModalProps } from "./Modal.type";
import styles from "./Modal.module.scss";

const Modal: FC<ModalProps> = ({
  setVisible,
  close,
  children,
  active,
  visible,
  classNames,
  activeClassNames,
  ...props
}) => {
  useSwipe({ lSwipe: close, ...props });

  useEffect(() => {
    if (active) {
      setVisible(true);
      document.body.classList.add(styles["no-scroll"]);
    }

    return () => {
      document.body.classList.remove(styles["no-scroll"]);
    };
  }, [active, setVisible]);

  useEffect(() => {
    const handlePressESC = (e: { code: string }) => {
      if (e.code === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handlePressESC);

    return () => {
      window.removeEventListener("keydown", handlePressESC);
    };
  }, [close]);

  const onHandleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      close();
    }
  };

  const modalClassNames = cn(styles["backdrop"], classNames, {
    [styles["active"]]: visible,
    [activeClassNames || ""]: visible,
  });

  const modal = (
    <div onClick={onHandleBackdropClick} className={modalClassNames}>
      {children}
    </div>
  );

  if (!active) return null;

  return createPortal(modal, document.body);
};

export default Modal;
