"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import { LoaderProps } from "./Loader.type";
import { createPortal } from "react-dom";

const Loader: FC<LoaderProps> = ({ active }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const loader = (
    <div className={styles["loader"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["spinner"]}></div>
      </div>
    </div>
  );

  if (active && mounted) return createPortal(loader, document.body);
  return null;
};

export default Loader;
