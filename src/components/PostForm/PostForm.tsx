"use client";
import React, { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import { Icon, Modal } from "@/components";
import { default_avatar } from "@/utils";
import { IconEnum } from "@/types";

import { Form, Preview } from "./components";
import { PostFormProps } from "./PostForm.type";
import { FormValues, postSchema } from "./validationSchema";
import styles from "./PostForm.module.scss";

const PostForm: FC<PostFormProps> = ({
  user,
  imageUrl,
  text,
  title,
  postId,
  ...props
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(postSchema),
    values: { title: title || "", text: text || "", image: null },
    mode: "onChange",
  });

  const { getValues, reset } = methods;

  return (
    <Modal
      {...props}
      classNames={styles["modal"]}
      activeClassNames={styles["active"]}
    >
      <div className={styles["body"]}>
        <button className={styles["cross-btn"]} onClick={() => props.close()}>
          <Icon icon={IconEnum.Cross} size={32} />
        </button>
        <div className={styles["body__user"]}>
          <Image
            src={user?.avatarUrl || default_avatar}
            alt="avatar"
            className={styles["avatar"]}
            width={44}
            height={44}
          />
          <p>{user?.nickName}</p>
        </div>
        <div className={styles["body__content"]}>
          <FormProvider {...methods}>
            {showPreview ? (
              <Preview
                close={props.close}
                reset={reset}
                values={getValues()}
                setShowPreview={setShowPreview}
                postId={postId}
              />
            ) : (
              <Form
                setShowPreview={setShowPreview}
                previewUrl={imageUrl}
                {...methods}
              />
            )}
          </FormProvider>
        </div>
      </div>
    </Modal>
  );
};

export default PostForm;
