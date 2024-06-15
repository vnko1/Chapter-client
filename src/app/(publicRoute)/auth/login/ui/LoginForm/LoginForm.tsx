"use client";
import React, { FC, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField, TextField, UIButton } from "@/components";
import { CustomError } from "@/services";
import { LinksEnum } from "@/types";
import { login } from "@/lib/session";
import { signIn } from "@/lib/actions";

import { LoginFormProps } from "./LoginForm.type";
import { FormValues, loginSchema } from "./validationSchema";
import styles from "./LoginForm.module.scss";

const defaultValues = { email: "", password: "" };

const LoginForm: FC<LoginFormProps> = ({ access_token, refresh_token }) => {
  const router = useRouter();
  const pathname = usePathname();

  const methods = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
    setError,
  } = methods;

  useEffect(() => {
    if (access_token && refresh_token) {
      login(access_token, refresh_token);
      router.replace(pathname);
    }
  }, [access_token, pathname, refresh_token, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await signIn(data);

      if (res?.isError) throw new CustomError(res.error);

      await login(res.data.access_token, res.data.refresh_token);
    } catch (error) {
      if (error instanceof CustomError) {
        const [, serviceMessage] = error.errorMessage.split("; ");
        if (
          serviceMessage?.endsWith("deleted") &&
          typeof error?.data === "string"
        ) {
          const deletedTimeStamp = error?.data.split(": ")[1];
          return router.push(
            LinksEnum.RESTORE + "?" + "deleted=" + deletedTimeStamp
          );
        }

        setError("root.serverError", {
          type: "custom",
          message: error.errorMessage,
        });
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
          aria-label="Email field input"
        />
        <PasswordField
          id="password"
          name="password"
          label="Your password"
          aria-label="Password field input"
          helperLink={{
            text: "Forgot password?",
            href: LinksEnum.FORGOT_PASSWORD,
          }}
        />
        <UIButton
          type="submit"
          fullWidth
          classNames={styles["button"]}
          disabled={!isValid || !isDirty}
          isLoading={isSubmitting}
          aria-label="Submit form button"
        >
          Log in
        </UIButton>
        {errors.root?.serverError ? (
          <p className={styles["error"]}>{errors.root.serverError.message}</p>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
