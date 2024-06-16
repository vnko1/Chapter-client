"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { changePassword } from "@/lib/actions";
import { LinksEnum } from "@/types";
import { CustomError } from "@/services";
import { PasswordField, UIButton } from "@/components";

import { ChangePasswordFormProps } from "./ChangePasswordForm.type";
import { changeSchema, FormValues } from "./validationSchema";

const defaultValues = { confirm_password: "", password: "" };

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ otp }) => {
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(changeSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = methods;

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await changePassword({ otp, password: data.password });

      if (res && res.isError) throw new CustomError(res.error);

      router.replace(LinksEnum.LOG_IN);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("confirm_password", {
          type: "validate",
          message: error.errorMessage,
        });
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <PasswordField
          id="password"
          name="password"
          label="Create password"
          placeholder="Enter your password"
          aria-label="Password field input"
          strength
          strengthMessage="New password must be at least 8 characters, including uppercase letters and special characters and be different from the previous one."
        />
        <PasswordField
          id="confirm_password"
          name="confirm_password"
          aria-label="Confirm password field input"
          label="Confirm password"
          placeholder="Re-enter your password"
          additionalLabel="Both passwords must match"
        />
        <UIButton
          type="submit"
          aria-label="Submit form button"
          fullWidth
          classNames="p-[12px] text-sm"
          disabled={!isValid}
          isLoading={isSubmitting}
        >
          Restore my password
        </UIButton>
      </form>
    </FormProvider>
  );
};

export default ChangePasswordForm;
