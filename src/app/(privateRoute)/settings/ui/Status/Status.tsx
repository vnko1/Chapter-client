"use client";
import React, { FC, useRef } from "react";
import { useProfileContext } from "@/context";
import { useEditField } from "@/hooks";
import { IconButton } from "..";
import styles from "./Status.module.scss";

const Status: FC = () => {
  const { user } = useProfileContext();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isEditing,
    value,
    error,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  } = useEditField({
    fieldType: "status",
    text: user.status,
    nodeRef: textareaRef,
  });

  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
      />
      <textarea
        className={styles["status"]}
        ref={textareaRef}
        value={value}
        disabled={!isEditing}
        onChange={onHandleChange}
        onFocus={onHandleFocus}
        aria-label="User status textarea field"
      />
      {error && <p className={styles["error"]}>{error}</p>}
    </>
  );
};

export default Status;
