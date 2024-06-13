"use client";
import { FC, useState } from "react";

import { resentOtp } from "@/lib/actions";

import { ResentOtpProps } from "./ResentOtp.type";
import styles from "./ResentOtp.module.scss";

const ResentOtp: FC<ResentOtpProps> = ({ email }) => {
  const [error, setError] = useState<string | null>(null);
  const onHandleClick = async () => {
    setError(null);
    const res = await resentOtp(email);

    if (res.isError) {
      console.log("🚀 ~ onHandleClick ~ res:", res);

      setError(res.error.errorMessage);
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
