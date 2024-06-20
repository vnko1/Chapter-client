"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useProfileContext } from "@/context";
import { ImageField, UIButton } from "@/components";
import { default_avatar } from "@/utils";
import { EndpointsEnum, IconEnum } from "@/types";
import { privateApi } from "@/api";

import styles from "./User.module.scss";

const User: FC = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { user, setUser } = useProfileContext();
  const methods = useForm({
    values: { image: null },
  });
  const { watch } = methods;
  const image = watch("image");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (image) {
      setIsLoading(true);
      privateApi
        .patch(
          EndpointsEnum.Profile,
          { image },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then((res) => {
          setUser(res.data.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [image, setUser]);

  return (
    <div className={styles["user"]}>
      <div className={styles["user__preview"]}>
        <FormProvider {...methods}>
          <ImageField
            name="image"
            id="image"
            inputRef={inputRef}
            previewUrl={user?.avatarUrl || default_avatar}
            previewClassNames={styles["preview"]}
            sizes="120"
          />
        </FormProvider>
        <p className={styles["user__email"]}>{user?.email}</p>
      </div>
      <div className={styles["user__status"]}>
        <UIButton
          alignIcon="left"
          icon={IconEnum.Camera}
          fullWidth
          variant="outlined"
          isLoading={isLoading}
          size="small"
          onClick={() => inputRef.current?.click()}
        >
          Upload new photo
        </UIButton>
      </div>
    </div>
  );
};

export default User;
