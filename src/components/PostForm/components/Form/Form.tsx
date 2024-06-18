"use client";
import React, { FC, useRef } from "react";
import { SubmitHandler } from "react-hook-form";

import { FormValues } from "../../validationSchema";
import { FormProps } from "./Form.type";
import styles from "./Form.module.scss";

import { UIButton, TextAreaField, TextField, ImageField } from "@/components";

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
      <ImageField name="image" width={620} height={280} inputRef={imageRef} />
      <button
        type="button"
        onClick={() => {
          imageRef.current?.click();
        }}
      >
        Add
      </button>
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
