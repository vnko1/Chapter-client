"use client";
import React, { FC, useRef } from "react";
import { SubmitHandler } from "react-hook-form";

import { FormValues } from "../../validationSchema";
import { FormProps } from "./Form.type";
import styles from "./Form.module.scss";

import {
  UIButton,
  TextAreaField,
  TextField,
  ImageField,
  Icon,
} from "@/components";
import { IconEnum } from "@/types";

const Form: FC<FormProps> = (props) => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { handleSubmit } = props;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      <TextField
        id="title"
        name="title"
        label="Add a title"
        classNames={styles["form__title"]}
        aria-label="Title input field"
      />

      <button
        className={styles["form__image-btn"]}
        type="button"
        onClick={() => {
          imageRef.current?.click();
        }}
      >
        <Icon icon={IconEnum.Image} size={48} />
        <span>.png, .jpg, .gif</span>
      </button>
      <ImageField name="image" inputRef={imageRef} />
      <TextAreaField
        id="text"
        name="text"
        placeholder="Add a text"
        aria-label="Caption textarea field"
      />
      <UIButton
        type="submit"
        dataAutomation="submitButton"
        fullWidth
        aria-label="Form submit button"
        classNames={styles["form__button"]}
      >
        Confirm
      </UIButton>
    </form>
  );
};

export default Form;
