"use client";

import React, { FC, useRef, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { TextField, UIButton } from "@/components";
import { emailCreate } from "@/lib/actions";
// import { LinksEnum } from "@/types";
// import { getDataFromLS, setDataToLS } from "@/utils";

import { FormValues, validationSchema } from "./validationSchema";
import styles from "./RegisterForm.module.scss";
import { CustomError } from "@/services";
import { LinksEnum } from "@/types";

const initialValues: FormValues = {
  email: "",
  otp: "",
};

const RegisterForm: FC = () => {
  const [showOtp, setShowOtp] = useState(false);
  const userId = useRef<string | null>(null);

  const validationType = showOtp ? "otp" : "email";

  const methods = useForm<FormValues>({
    values: initialValues,
    mode: "all",
    resolver: zodResolver(validationSchema(validationType)),
  });
  const { formState, handleSubmit, setError } = methods;
  const { isValid, isSubmitting } = formState;
  const { push } = useRouter();

  const handleEmail = async (email: string) => {
    const res = await emailCreate(email);
    console.log("🚀 ~ handleEmail ~ res:", res);

    if ("errorMessage" in res) {
      const [errorMessage, serviceMessage] = res.errorMessage.split("; ");
      console.log("🚀 ~ handleEmail ~ errorMessage:", errorMessage);
      if (typeof serviceMessage === "string") {
        setError("root.serverError", {
          message: errorMessage,
          type: "custom",
        });

        if (serviceMessage.endsWith("unconfirmed"))
          return setTimeout(() => setShowOtp(true), 2000);

        if (serviceMessage.endsWith("confirmed"))
          return setTimeout(() => push(LinksEnum.ACCOUNT_CREATION), 2000);

        if (serviceMessage.endsWith("completed"))
          return setTimeout(() => push(LinksEnum.LOG_IN), 2000);
      }

      return setError("root.serverError", {
        message: errorMessage,
        type: "custom",
      });
    }

    // setShowOtp(true);
  };

  const handleOtp = async (otp: string) => {
    try {
      console.log("🚀 ~ otp:", otp);
    } catch (error) {
      console.log("🚀 ~ handleOtp ~ error:", error);
    }
  };

  const onHandleSubmit: SubmitHandler<FormValues> = async (formValues) => {
    if ("email" in formValues) return await handleEmail(formValues.email);
    return await handleOtp(formValues.otp);
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
          disabled={isSubmitting || !isValid}
        >
          Create new account
        </UIButton>
        {formState.errors.root?.serverError ? (
          <p className={styles["form__error"]}>
            {formState.errors.root?.serverError.message}
          </p>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
