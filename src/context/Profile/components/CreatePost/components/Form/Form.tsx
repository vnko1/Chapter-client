"use client";
import React, { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { FormValues } from "../../validationSchema";
import { FormProps } from "./Form.type";
import styles from "./Form.module.scss";

const Form: FC<FormProps> = (props) => {
  const { handleSubmit } = props;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
      Form
    </form>
  );
};

export default Form;
