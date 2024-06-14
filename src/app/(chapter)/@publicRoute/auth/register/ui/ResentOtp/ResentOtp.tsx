"use client";
import { FC, useState } from "react";

import { resentOtp } from "@/lib/actions";

import { ResentOtpProps } from "./ResentOtp.type";
import styles from "./ResentOtp.module.scss";
import { CustomError } from "@/services";

const ResentOtp: FC<ResentOtpProps> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);
  const onHandleClick = async () => {
    setError(null);
    try {
      const res = await resentOtp(email);

      if (res && res.isError) throw new CustomError(res.error);
    } catch (error) {
      if (error instanceof CustomError) setError(error.errorMessage);
    }
  };

  return (
    <div className={styles["resent"]}>
      <p className={styles["resent__message"]}>3 attempt per 24 hours.</p>
      <div className={styles["resent__label"]}>
        <p>Send the code again?</p>
        <button
          onClick={onHandleClick}
          className={styles["resent__button"]}
          aria-label="Resent OTP button"
          type="button"
        >
          Click here.
        </button>
      </div>
      {error && <p className={styles["error"]}>{error}</p>}
    </div>
  );
};

export default ResentOtp;
