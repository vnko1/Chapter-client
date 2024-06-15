"use client";
import React, { FC, useEffect } from "react";
import { login } from "@/lib/session";

import { LoginFormProps } from "./LoginForm.type";
// import styles from "./LoginForm.module.scss";

const LoginForm: FC<LoginFormProps> = ({ access_token, refresh_token }) => {
  useEffect(() => {
    if (access_token && refresh_token) {
      login(access_token, refresh_token);
    }
  }, [access_token, refresh_token]);

  return <form>LoginForm</form>;
};

export default LoginForm;
