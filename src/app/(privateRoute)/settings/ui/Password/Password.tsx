"use client";
import React, { FC } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";

import { EndpointsEnum } from "@/types";
import { privateApi } from "@/api";
import { PasswordField, UIButton } from "@/components";

import { FormValues, passwordSchema } from "./validationSchema";
import styles from "./Password.module.scss";

const initialValues = { password: "", newPassword: "", confirmNewPassword: "" };
const Password: FC = () => {
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
    setError,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await privateApi.patch(EndpointsEnum.Password, data);
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        setError("root.serverError", {
          type: "custom",
          message: error.response?.data.errorMessage,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["password"]}>
        <PasswordField
          id="password"
          name="password"
          label="Old password"
          aria-label="Confirm password input field"
          placeholder="Re-enter your password"
          classNames={`${styles["password__input"]} ${styles["input"]}`}
        />
        <PasswordField
          id="newPassword"
          name="newPassword"
          label="New password"
          aria-label="Password input field"
          placeholder="Enter your password"
          classNames={`${styles["password__input"]} ${styles["input"]}`}
          strength
        />
        <PasswordField
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Repeat new password"
          aria-label="Confirm password input field"
          placeholder="Re-enter your password"
          classNames={`${styles["password__input"]} ${styles["input"]}`}
        />
        <UIButton
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          classNames={`${styles["password__button"]} ${styles["button"]}`}
          aria-label="Submit form button"
        >
          Update my password
        </UIButton>
        {errors.root?.serverError ? (
          <p className={styles["error"]}>{errors.root?.serverError.message}</p>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default Password;
