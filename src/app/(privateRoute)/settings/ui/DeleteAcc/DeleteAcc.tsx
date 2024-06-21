"use client";
import { FC } from "react";

import { privateApi } from "@/api";
import { EndpointsEnum } from "@/types";
import styles from "./DeleteAcc.module.scss";

const DeleteAcc: FC = () => {
  const onDeleteAcc = async () => privateApi.delete(EndpointsEnum.Profile);
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
