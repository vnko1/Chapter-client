"use client";

import React, { FC, useRef, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { TextField, UIButton } from "@/components";
import { LinksEnum } from "@/types";
import { CustomError } from "@/services";
import { emailConfirm, emailCreate } from "@/lib/actions";

import { registerSchema, RegisterSchemaType } from "./validationSchema";
import styles from "./RegisterForm.module.scss";
import ResentOtp from "../ResentOtp/ResentOtp";

const initialValues: RegisterSchemaType = {
  email: "",
  otp: "",
};

const RegisterForm: FC = () => {
  const [showOtp, setShowOtp] = useState(false);
  const userId = useRef<string | null>(null);

  const methods = useForm<RegisterSchemaType>({
    values: initialValues,
    mode: "onSubmit",
    resolver: zodResolver(registerSchema),
  });

  const { formState, handleSubmit, setError, getValues, clearErrors } = methods;
  const { isSubmitting } = formState;
  const { push } = useRouter();

  const handleEmail = async (email: string) => {
    try {
      const res = await emailCreate(email);
      console.log("🚀 ~ handleEmail ~ res:", res);

      if (res && res.isError) throw new CustomError(res.error);
      userId.current = res.data.userId;
      setShowOtp(true);
    } catch (error) {
      if (error instanceof CustomError) {
        const [message, serviceMessage] = error.errorMessage.split("; ");
        if (typeof serviceMessage === "string") {
          setError("root.serverError", {
            message,
            type: "custom",
          });
          if (serviceMessage.endsWith("unconfirmed")) {
            userId.current = error.data?.userId ?? null;
            return setTimeout(() => {
              clearErrors("root");
              setShowOtp(true);
            }, 2000);
          }
          if (serviceMessage.endsWith("confirmed"))
            return setTimeout(
              () => push(LinksEnum.ACCOUNT_CREATION + "/" + error.data?.userId),
              2000
            );
          if (
            serviceMessage.endsWith("completed") ||
            serviceMessage.endsWith("restoring") ||
            serviceMessage.endsWith("deleted")
          )
            return setTimeout(() => push(LinksEnum.LOG_IN), 2000);
        }
        return setError("root.serverError", {
          message,
          type: "custom",
        });
      }
    }
  };

  const handleOtp = async (otp: string | undefined) => {
    try {
      const res = await emailConfirm({
        otp: otp as string,
        userId: userId.current as string,
      });

      if (res && res.isError) throw new CustomError(res.error);

      push(LinksEnum.ACCOUNT_CREATION + "/" + res.data.userId);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("root.serverError", {
          message: error.errorMessage,
          type: "custom",
        });
      }
    }
  };

  const onHandleSubmit: SubmitHandler<RegisterSchemaType> = async (
    formValues
  ) => {
    if (showOtp) return await handleOtp(formValues.otp);
    return await handleEmail(formValues.email);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles["form"]} onSubmit={handleSubmit(onHandleSubmit)}>
        <TextField
          id="email"
          name="email"
          label="Your email"
          classNames={showOtp ? styles["form__input"] : ""}
          disabled={showOtp}
          aria-label="Email input field"
        />
        {showOtp ? (
          <>
            <p className={styles["message"]}>
              &apos;We just sent you a temporary sign code. Please check your
              inbox and paste code below.&apos;
            </p>

            <TextField
              id="otp"
              name="otp"
              label="Sign up code"
              additionalLabel="It may take up to 2 minutes for the code to be sent."
              aria-label="OTP input field"
            />
          </>
        ) : null}
        <UIButton
          className={styles["form__button"]}
          dataAutomation="submitButton"
          type="submit"
          aria-label="Submit form button"
          fullWidth
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Create new account
        </UIButton>
        {formState.errors.root?.serverError ? (
          <p className={styles["form__error"]}>
            {formState.errors.root?.serverError.message}
          </p>
        ) : null}
        {showOtp ? <ResentOtp email={getValues("email")} /> : null}
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
