"use client";
import { FC, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import cn from "classnames";

import { IconEnum } from "@/types";
import { Icon } from "@/components";

import { TextFieldProps } from "./TextField.type";
import styles from "./TextField.module.scss";

const TextField: FC<TextFieldProps> = ({
  id,
  classNames,
  label,
  name,
  type = "text",
  showSuccessIcon = false,
  customErrorMessage,
  additionalLabel,
  onChange,
  ...props
}) => {
  const { register, setValue, getFieldState, getValues } = useFormContext();
  const { error, isTouched } = getFieldState(name);
  const value = getValues(name);

  const isSuccessValidation = isTouched && !error;
  const isErrorValidation = isTouched && error;

  const validationClassname = cn({
    "text-field--has-error": isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn(styles["text-field"], validationClassname, classNames)}>
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <input
            {...register(name)}
            id={id}
            type={type}
            {...props}
            className={styles["text-field__input"]}
            onChange={onHandleChangeField}
          />
          {showSuccessIcon && isSuccessValidation && !customErrorMessage ? (
            <Icon
              icon={IconEnum.Ok}
              size={20}
              className={styles["text-field__icon"]}
            />
          ) : null}
        </div>
      </label>
      <div className={styles["text-field__helper-box"]}>
        {isErrorValidation ? (
          <p className={styles["text-field__error-message"]}>
            {error.message as string}
          </p>
        ) : null}
        {additionalLabel && !value.length ? (
          <p className={styles["text-field__additional-label"]}>
            {additionalLabel}
          </p>
        ) : null}
      </div>
    </div>
  );
};
export default TextField;
