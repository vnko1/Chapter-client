"use client";
import React, { ChangeEvent, FC } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { ImageFieldProps } from "./ImageField.type";
import styles from "./ImageField.module.scss";

const ImageField: FC<ImageFieldProps> = ({
  name,
  inputRef,
  width,
  height,
  alt = "",
  classNames,
  previewClassNames,
  placeholder,
  disabled,
  sizes,
}) => {
  const { register, setValue, watch } = useFormContext();

  const preview = watch(name);

  const { ref: registerRef, ...rest } = register(name);

  const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    const urlImage = URL.createObjectURL(file);
    setValue(name, urlImage);
    event.target.value = "";
  };

  return (
    <div className={`${styles["field"]} ${classNames}`}>
      <input
        type="file"
        {...rest}
        ref={(el) => {
          registerRef(el);
          inputRef.current = el;
        }}
        onChange={handleUploadedFile}
        className={styles["field__input"]}
        accept="image/*"
        aria-label="Image upload field"
        disabled={disabled}
      />
      <Image
        className={`${styles["field__image"]} ${previewClassNames}`}
        width={width}
        height={height}
        alt={alt}
        src={preview || ""}
        placeholder={placeholder}
        sizes={sizes}
      />
    </div>
  );
};

export default ImageField;
