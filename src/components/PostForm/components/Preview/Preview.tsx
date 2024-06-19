"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { UIButton } from "@/components";

import { PreviewProps } from "./Preview.type";
import styles from "./Preview.module.scss";

const Preview: FC<PreviewProps> = ({ values, setShowPreview }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (values.image) {
      setPreview(URL.createObjectURL(values.image));
    }
  }, [values.image]);

  return (
    <div className={styles["preview"]}>
      {preview && (
        <div className={styles["preview__image"]}>
          <Image
            src={preview}
            objectFit="cover"
            objectPosition="center"
            alt="post image"
            fill
          />
        </div>
      )}
      <div className={styles["preview__title"]}>
        <p>{values.title}</p>
      </div>
      <div className={styles["preview__text"]}>
        <p>{values.text}</p>
      </div>
      <div className={styles["preview__buttons"]}>
        <UIButton
          onClick={() => setShowPreview(false)}
          fullWidth
          variant="outlined"
          aria-label="Back to previous page button"
        >
          Back
        </UIButton>
        <UIButton
          //   disabled={isLoading}
          //   isLoading={isLoading}
          //   onClick={onHandlePublishClick}

          aria-label="Publish post button"
          fullWidth
        >
          Publish
        </UIButton>
      </div>
      {/* {error ? <p className={styles["error"]}>{error}</p> : null} */}
    </div>
  );
};

export default Preview;
