"use client";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { UIButton } from "@/components";
import { CustomError } from "@/services";
import { addPost, changePost } from "@/lib/actions";

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
  const [isLoading, setIsLoading] = useState(false);

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
    const data = new FormData();
    if (values.text) data.append("text", values.text);
    if (values.image) data.append("image", values.image);
    if (values.title) data.append("title", values.title);
    setIsLoading(true);
    try {
      const res = await addPost(data);

      if (res?.isError) throw new CustomError(res.error);

      resetFields();
    } catch (error) {
      if (error instanceof CustomError) {
        setError(error.errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = async (postId: string) => {
    const data = new FormData();
    if (values.text) data.append("text", values.text);
    if (values.image) data.append("image", values.image);
    if (values.title) data.append("title", values.title);

    setIsLoading(true);
    try {
      const res = await changePost({ postId, data });
      if (res?.isError) throw new CustomError(res.error);

      resetFields();
    } catch (error) {
      if (error instanceof CustomError) {
        setError(error.errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitChanges = async () => {
    if (postId) return await editPost(postId);
    return await publishPost();
  };

  return (
    <div className={styles["preview"]}>
      {preview && (
        <div className={styles["preview__image"]}>
          <Image
            src={preview}
            alt="post image"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
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
          isLoading={isLoading}
          variant="outlined"
          aria-label="Back to previous page button"
        >
          Back
        </UIButton>
        <UIButton
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
