"use client";
import { FC, useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField, TextField, UIButton } from "@/components";

import { AccountFormProps } from "./AccountForm.type";
import { accountSchema, FormValues } from "./validationSchema";
import styles from "./AccountForm.module.scss";
import { useDebounce } from "@/hooks";

const initialValues: FormValues = {
  fullName: "",
  nickName: "",
  password: "",
  confirm_password: "",
};

const AccountForm: FC<AccountFormProps> = () => {
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    mode: "all",
    resolver: zodResolver(accountSchema),
  });

  const { handleSubmit, formState, getValues } = methods;
  const { isValid, errors } = formState;

  const debouncedNK = useDebounce(getValues("nickName"), 500);

  const handleNKChange = (nickName: string) => {
    console.log("🚀 ~ nickName:", nickName);
  };

  useEffect(() => {
    if (debouncedNK) handleNKChange(debouncedNK);
  }, [debouncedNK]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <TextField
          id="fullName"
          name="fullName"
          label="Full name"
          placeholder="ex. John Brick, Dina O'neal, Jonathan... "
          showSuccessIcon={true}
          aria-label="Full name input field"
        />
        <TextField
          id="nickName"
          name="nickName"
          label="Nickname"
          aria-label="Nickname input field"
          value={debouncedNK}
          placeholder="@JaneSMTH"
          showSuccessIcon={true}
        />
        <PasswordField
          id="password"
          name="password"
          label="Create password"
          aria-label="Password input field"
          placeholder="Enter your password"
          strength
        />
        <PasswordField
          id="confirm_password"
          name="confirm_password"
          label="Confirm password"
          aria-label="Confirm password input field"
          placeholder="Re-enter your password"
        />
        <UIButton
          type="submit"
          fullWidth
          className={styles["button"]}
          disabled={!isValid}
          //   isLoading={false}
          aria-label="Submit form button"
        >
          Save changes
        </UIButton>
        {errors.root?.serverError ? (
          <p className={styles["form__error"]}>
            {errors.root?.serverError.message}
          </p>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default AccountForm;
