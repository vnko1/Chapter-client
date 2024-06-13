"use client";

import React, { FC, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";

import { TextField, UIButton } from "@/components";
import { LinksEnum } from "@/types";
import { getDataFromLS, setDataToLS } from "@/utils";

import { FormValues, validationSchema } from "./validationSchema";

import styles from "./RegisterForm.module.scss";

const initialValues: FormValues = {
  email: "",
  otp: "",
};
const RegisterForm: FC = () => {
  const methods = useForm();
  const {} = methods;
  const [step, setStep] = useState(1);
  const { replace } = useRouter();
  const isNextStep = step > 1;
  const validationType = step > 1 ? "otp" : "email";

  const handleEmail = async (email: string) => {};

  const handleOtp = async (hash: string) => {};

  const onHandleSubmit = async () => {};

  return (
    <FormProvider {...methods}>
      <form className={styles["form"]}>
        <TextField
          id="email"
          name="email"
          value={values.email}
          label="Your email"
          classNames={isNextStep ? styles["form__input"] : ""}
          disabled={isNextStep}
          aria-label="Email input field"
        />
        {isNextStep ? (
          <>
            {/* <FormNotification /> */}
            <TextField
              id="hash"
              name="hash"
              label="Sign up code"
              additionalLabel="It may take up to 2 minutes for the code to be sent."
              value={values.hash}
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
          disabled={isSubmitting || !isValid || !dirty}
        >
          Create new account
        </UIButton>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
