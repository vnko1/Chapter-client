"use client";
import React, { FC, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useProfileContext } from "@/context";
import { ImageField } from "@/components";

import styles from "./User.module.scss";
import { default_avatar } from "@/utils";

const Avatar: FC = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { user } = useProfileContext();
  const methods = useForm({
    values: { image: null },
  });

  return (
    <FormProvider {...methods}>
      <div className={styles["user"]}>
        <div className={styles["user__preview"]}>
          <ImageField
            name="image"
            id="image"
            inputRef={inputRef}
            previewUrl={user?.avatarUrl || default_avatar}
            previewClassNames={styles["preview"]}
          />
        </div>
        <p className={styles["user__email"]}>{user?.email}</p>
      </div>
    </FormProvider>
  );
};

export default Avatar;
