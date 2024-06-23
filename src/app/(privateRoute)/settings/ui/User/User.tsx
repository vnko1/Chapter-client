"use client";
import React, { FC, useEffect, useRef, useState } from "react";

import { FormProvider, useForm } from "react-hook-form";

import { useProfileContext } from "@/context";
import { ImageField, UIButton } from "@/components";
import { default_avatar } from "@/utils";
import { IconEnum } from "@/types";
import { CustomError } from "@/services";
import { editProfile } from "@/lib/actions";

import { Layout, Status } from "..";

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
      const data = new FormData();
      data.append("image", image);
      setIsLoading(true);
      editProfile(data)
        .then((res) => {
          if (res?.isError) throw new CustomError(res.error);
          setUser(res.data);
        })
        .catch((error) => {
          if (error instanceof CustomError) {
            console.log(error);
          }
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
            previewUrl={user.avatarUrl || default_avatar}
            previewClassNames={styles["preview"]}
            sizes="120"
            objectFit="cover"
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
        <Layout>
          <Status />
        </Layout>
      </div>
    </div>
  );
};

export default User;
