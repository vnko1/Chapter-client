import React from "react";

import { BlockAuth } from "../../ui";
import styles from "./change.module.scss";
import { ChangePasswordForm } from "../ui";

function ChangePasswordPage({ params: { otp } }: { params: { otp: string } }) {
  return (
    <BlockAuth
      heading="Create new password"
      showBottomText={true}
      typePageText="Restore password"
    >
      <div className={styles["wrapper"]}>
        <ChangePasswordForm otp={otp} />
      </div>
    </BlockAuth>
  );
}

export default ChangePasswordPage;
