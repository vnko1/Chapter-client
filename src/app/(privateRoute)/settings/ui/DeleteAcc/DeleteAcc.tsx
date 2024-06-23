"use client";
import { FC } from "react";

import { deleteUserAccount } from "@/lib/actions";

import styles from "./DeleteAcc.module.scss";

const DeleteAcc: FC = () => {
  const onDeleteAcc = async () => {
    await deleteUserAccount(undefined);
  };
  return (
    <div className={styles["account-delete"]}>
      <h3 className={styles["account-delete__title"]}>
        Do you want to delete your account?
      </h3>
      <button
        onClick={onDeleteAcc}
        className={styles["account-delete__button"]}
        aria-label="delete account"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteAcc;
