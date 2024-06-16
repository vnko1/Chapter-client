"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icon, TextField, UIButton } from "@/components";
import { IconEnum, LinksEnum } from "@/types";
import { confirmAccountRestore, restoreAccount } from "@/lib/actions";
import { CustomError } from "@/services";

import { RestoreFormProps } from "./RestoreForm.type";
import { restoreSchema, RestoreSchemaType } from "./validationSchema";
import styles from "./RestoreForm.module.scss";
import { removeDataFromSS } from "@/utils";

const defaultValues = { otp: "" };
const RestoreForm: FC<RestoreFormProps> = ({ email }) => {
  const router = useRouter();
  const methods = useForm<RestoreSchemaType>({
    defaultValues,
    resolver: zodResolver(restoreSchema),
    mode: "onChange",
  });
  const {
    handleSubmit,
    setError,
    formState: { isDirty, isValid, isSubmitting },
  } = methods;

  const onHandleCrossClick = () => {
    router.back();
  };

  const onHandleResentOtpClick = async () => {
    try {
      const res = await restoreAccount(email);
      if (res?.isError) throw new CustomError(res.error);
    } catch (error) {
      if (error instanceof CustomError) {
        console.log("🚀 ~ onClick ~ error:", error);
      }
    }
  };

  const onSubmit: SubmitHandler<RestoreSchemaType> = async (data) => {
    try {
      const res = await confirmAccountRestore(data.otp);

      if (res?.isError) throw new CustomError(res.error);
      removeDataFromSS("deletedTimeStamp", "email");
      router.push(LinksEnum.LOG_IN);
    } catch (error) {
      if (error instanceof CustomError) {
        setError("otp", { type: "onChange", message: error.errorMessage });
      }
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <button
        className={styles["wrapper__button"]}
        aria-label="Nav back button"
        onClick={onHandleCrossClick}
      >
        <Icon icon={IconEnum.Cross} size={32} />
      </button>
      <div className={styles["restore-email"]}>
        <h3>The code has been sent to your email.</h3>
        <FormProvider {...methods}>
          <form
            className={styles["email__form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="otp"
              name="otp"
              label="Confirmation code"
              aria-label="OTP field input"
            />
            <UIButton
              classNames={`${styles["email__form-button"]} ${styles["button"]}`}
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid || !isDirty}
              aria-label="Submit form button button"
            >
              Confirm
            </UIButton>
          </form>
        </FormProvider>
        <button
          onClick={onHandleResentOtpClick}
          className={styles["email__resent-btn"]}
          aria-label="Send OTP button"
        >
          Send the <span>code</span> again?
        </button>
      </div>
    </div>
  );
};

export default RestoreForm;
