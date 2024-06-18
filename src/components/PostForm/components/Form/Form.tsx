"use client";
import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { FormValues } from "../../validationSchema";
import { FormProps } from "./Form.type";
import styles from "./Form.module.scss";
import { TextField } from "@/components/Fields";
import { UIButton } from "@/components/Buttons";

const Form: FC<FormProps> = (props) => {
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
