"use client";
import React, { FC } from "react";
import { ForgotPasswordFormProps } from "./ForgotPasswordForm.type";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TextField, UIButton } from "@/components";
import { CustomError } from "@/services";

import { forgotSchema, FormValues } from "./validationSchema";
import { resetPassword } from "@/lib/actions";

const defaultValues = { email: "" };

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ setSubmitted }) => {
  const methods = useForm<FormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues,
  });
  const {
    formState: { isDirty, isSubmitting, isValid },
    handleSubmit,
    setError,
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await resetPassword(data.email);
      if (res && res.isError) throw new CustomError(res.error);
      setSubmitted(true);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("email", { type: "onChange", message: error.errorMessage });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          name="email"
          label="Your email"
          placeholder="Enter your email address..."
        />
        <UIButton
          type="submit"
          size="medium"
          fullWidth
          isLoading={isSubmitting}
          disabled={!isValid || !isDirty}
        >
          Restore my password
        </UIButton>
      </form>
    </FormProvider>
  );
};

export default ForgotPasswordForm;
