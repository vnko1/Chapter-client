"use client";

import React, { FC, useRef, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { TextField, UIButton } from "@/components";
// import { LinksEnum } from "@/types";
// import { getDataFromLS, setDataToLS } from "@/utils";

import { FormValues, validationSchema } from "./validationSchema";
import styles from "./RegisterForm.module.scss";

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
  const { formState, handleSubmit } = methods;
  const { isValid, isSubmitting } = formState;
  const { replace } = useRouter();

  const handleEmail = async (email: string) => {
    try {
      console.log("🚀 ~ handleEmail ~ email:", email);
      setShowOtp(true);
    } catch (error) {
      console.log("🚀 ~ handleEmail ~ error:", error);
    }
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
              // additionalLabel="It may take up to 2 minutes for the code to be sent."
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
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
