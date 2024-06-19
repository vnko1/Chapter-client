"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { isAxiosError } from "axios";

import { UIButton } from "@/components";
import { EndpointsEnum } from "@/types";
import { privateApi } from "@/api";

import { PreviewProps } from "./Preview.type";
import styles from "./Preview.module.scss";

const Preview: FC<PreviewProps> = ({
  values,
  postId,
  setShowPreview,
  close,
  reset,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (values.image) {
      setPreview(URL.createObjectURL(values.image));
    }
  }, [values.image]);

  const resetFields = () => {
    setPreview(null);
    reset();
    close();
    setTimeout(() => setShowPreview(false), 200);
  };

  const publishPost = async () => {
    try {
      await privateApi.post(EndpointsEnum.Post, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetFields();
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.errorMessage);
      }
    }
  };
  const editPost = async () => {
    try {
      await privateApi.patch(EndpointsEnum.Post + "/" + postId, values, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetFields();
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response?.data.errorMessage);
      }
    }
  };

  const submitChanges = async () => {
    if (postId) return await editPost();
    return await publishPost();
  };

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
        <h4>{values.title}</h4>
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
          onClick={submitChanges}
          aria-label="Publish post button"
          fullWidth
        >
          Publish
        </UIButton>
      </div>
      {error && <p className={styles["error"]}>{error}</p>}
    </div>
  );
};

export default Preview;
