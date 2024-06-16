"use client";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField, TextField, UIButton } from "@/components";
import { LinksEnum } from "@/types";
import { useDebounce } from "@/hooks";
import { emojiRegex, getDataFromLS } from "@/utils";
import { CustomError } from "@/services";
import { accountCreate, nicknameValidate } from "@/lib/actions";

import { AccountFormProps } from "./AccountForm.type";
import { accountSchema, FormValues } from "./validationSchema";
import styles from "./AccountForm.module.scss";

const initialValues: FormValues = {
  fullName: "",
  nickName: "",
  password: "",
  confirm_password: "",
};

const AccountForm: FC<AccountFormProps> = ({ userId }) => {
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: zodResolver(accountSchema),
  });

  const { handleSubmit, watch, setValue, formState, setError } = methods;
  const { isValid, errors, isSubmitting } = formState;

  const debouncedNK = useDebounce(watch("nickName"), 500);

  useEffect(() => {
    const cookieIsAcceptedValue =
      getDataFromLS<boolean>("cookieAccept") || false;
    setCookieAccepted(cookieIsAcceptedValue);
  }, []);

  useEffect(() => {
    if (debouncedNK) handleNKChange(debouncedNK);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNK]);

  const handleNKChange = async (nickName: string) => {
    try {
      const res = await nicknameValidate(nickName);
      if (res && res.isError) throw new CustomError(res.error);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("nickName", { type: "onChange", message: error.errorMessage });
      }
    }
  };

  const onHandleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !e.currentTarget.value.startsWith("@") &&
      e.currentTarget.value.length
    ) {
      return setValue(
        "nickName",
        "@" + e.currentTarget.value.replace(" ", "").replace(emojiRegex, "")
      );
    }
    setValue(
      "nickName",
      e.currentTarget.value.replace(" ", "").replace(emojiRegex, "")
    );
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { confirm_password, fullName, ...formValues } = data;
    confirm_password;
    const [firstName, lastName] = fullName.split(" ");

    try {
      const res = await accountCreate({
        ...formValues,
        firstName,
        lastName,
        userId,
        cookieAccepted,
      });

      if (res && res.isError) throw new CustomError(res.error);

      router.push(LinksEnum.LOG_IN);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("root.serverError", {
          type: "custom",
          message: error.errorMessage,
        });
      }
    }
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
          placeholder="@JaneSMTH"
          showSuccessIcon={true}
          onChange={onHandleChangeNickname}
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
          classNames={styles["button"]}
          disabled={!isValid || isSubmitting}
          isLoading={isSubmitting}
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
