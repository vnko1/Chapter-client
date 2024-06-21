"use client";
import { ChangeEvent, FC, useRef } from "react";

import { emojiRegex } from "@/utils";
import { useEditField } from "@/hooks";
import { useProfileContext } from "@/context";

import { IconButton } from "..";
import styles from "./FullName.module.scss";

const FullName: FC = () => {
  const {
    user: { firstName, lastName },
  } = useProfileContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    isEditing,
    value,
    onHandleEdit,
    onHandleSave,
    onHandleChange,
    onHandleFocus,
  } = useEditField({
    fieldType: "fullName",
    text: firstName + " " + lastName,
    nodeRef: inputRef,
  });
  const inputValue = value ? value : "";

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(emojiRegex, "");
    onHandleChange(e);
  };
  return (
    <>
      <IconButton
        isEditing={isEditing}
        onHandleEdit={onHandleEdit}
        onHandleSave={onHandleSave}
      />
      <label className={styles["info"]}>
        <span className={styles["info__text"]}>Full Name</span>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={onChange}
          className={styles["info__input"]}
          disabled={!isEditing}
          onFocus={onHandleFocus}
          data-automation="userNameInput"
        />
      </label>
    </>
  );
};
export default FullName;
