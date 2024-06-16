"use client";
import React, { useState } from "react";
import { BlockAuth } from "../ui";
import { ForgotPasswordForm, ForgotPasswordMessage } from "./ui";
import styles from "./forgot.module.scss";

function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <BlockAuth heading="Forgot password">
      <div className={styles["forgot-page"]}>
        {submitted ? (
          <ForgotPasswordMessage setSubmitted={setSubmitted} />
        ) : (
          <ForgotPasswordForm setSubmitted={setSubmitted} />
        )}
      </div>
    </BlockAuth>
  );
}

export default ForgotPasswordPage;
