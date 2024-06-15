"use client";
import React, { FC } from "react";
import { ForgotPasswordMessageProps } from "./ForgotPasswordMessage.type";
import styles from "./ForgotPasswordMessage.module.scss";

const ForgotPasswordMessage: FC<ForgotPasswordMessageProps> = ({
  setSubmitted,
}) => {
  return (
    <div className={styles["container"]}>
      <p className="mb-5">
        We just sent you link to restore your password. Please check your inbox.
      </p>
      <p>
        If you did not receive the email,&nbsp;
        <button
          className="text-blue cursor-pointer"
          onClick={() => setSubmitted(false)}
        >
          click here
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordMessage;
