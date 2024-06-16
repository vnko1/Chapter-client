"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDataFromSS } from "@/utils";

import { RestoreForm, RestoreMessage } from "./ui";
import styles from "./restore.module.scss";

function AccountRestorePage() {
  const router = useRouter();
  const [timeStamp, setTimeStamp] = useState("");
  const [email, setEmail] = useState("");
  const [showRestoreForm, setShowRestoreForm] = useState(false);

  useEffect(() => {
    const email = getDataFromSS<string>("email");
    const deletedTimeStamp = getDataFromSS<string>("deletedTimeStamp");
    if (email && deletedTimeStamp) {
      setTimeStamp(deletedTimeStamp);
      setEmail(email);
    } else router.back();
  }, [router]);

  return (
    <section className={styles["restore-page"]}>
      <div className={styles["restore-page-container"]}>
        {showRestoreForm ? (
          <RestoreForm email={email} />
        ) : (
          <RestoreMessage
            deletedTimeStamp={timeStamp}
            setShowRestoreForm={setShowRestoreForm}
            email={email}
          />
        )}
      </div>
    </section>
  );
}

export default AccountRestorePage;
