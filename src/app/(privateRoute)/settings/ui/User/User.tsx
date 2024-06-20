"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useProfileContext } from "@/context";
import { ImageField, UIButton } from "@/components";
import { default_avatar } from "@/utils";
import { EndpointsEnum, IconEnum, IUser } from "@/types";
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
      const avatarUrl = URL.createObjectURL(image);
      setIsLoading(true);
      privateApi
        .patch(
          EndpointsEnum.Profile,
          { image },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(() => {
          setUser((user) => ({ ...(user as IUser), avatarUrl }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [image, setUser]);

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
            sizes="120"
          />
        </div>
        <p className={styles["user__email"]}>{user?.email}</p>
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
    </FormProvider>
  );
};

export default User;
