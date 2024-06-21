"use client";
import { FC } from "react";

import { privateApi } from "@/api";
import { logout } from "@/lib/session";
import { EndpointsEnum } from "@/types";
import styles from "./DeleteAcc.module.scss";

const DeleteAcc: FC = () => {
  const onDeleteAcc = async () => {
    await privateApi.delete(EndpointsEnum.Profile);
    logout();
  };
  return (
    <div className={styles["account-delete"]}>
      <h3 className={styles["account-delete__title"]}>
        Do you want to delete your account?
      </h3>
      <button
        onClick={onDeleteAcc}
        className={styles["account-delete__button"]}
        aria-label="Open delete account confirmation menu"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAcc;
