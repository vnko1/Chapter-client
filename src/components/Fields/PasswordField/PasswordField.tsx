"use client";
import { ChangeEvent, FC, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import cn from "classnames";
import Link from "next/link";

import { emojiRegex } from "@/utils";
import { IconEnum } from "@/types";
import { Icon } from "@/components";

import { PasswordFieldProps, TypePasswordStrength } from "./PasswordField.type";
import { usePasswordStrength } from "./usePasswordStrength";
import styles from "./PasswordField.module.scss";

const PasswordField: FC<PasswordFieldProps> = ({
  id,
  label,
  name,
  strength,
  classNames,
  strengthMessage = "Password must be at least 8 characters long, include only Latin letters, one uppercase letter, one number, space symbol mustn't be included",
  helperLink,
  additionalLabel,
  onChange,
  ...props
}) => {
  const { field } = useController({ name });
  const { register, setValue, getFieldState, getValues } = useFormContext();
  const { error, isTouched } = getFieldState(name);

  const values = getValues(name);

  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const { passwordStrength, passwordValue, LENGTH_STRENGTH, onHandleChange } =
    usePasswordStrength();

  const typePasswordStrengthClassname = cn({
    [TypePasswordStrength.WEAK]: passwordStrength === 1,
    [TypePasswordStrength.OKEY]: passwordStrength === 2,
    [TypePasswordStrength.STRONG]: passwordStrength === 3,
  });

  const isErrorValidation = isTouched && error;

  const validationClassname = cn({
    [styles["text-field--success"]]: isTouched && !error,
    [styles["text-field--has-error"]]: isErrorValidation,
  });

  const onHandleChangeField = (event: ChangeEvent<HTMLInputElement>) => {
    field.onChange(event);
    event.target.value = event.target.value
      .replace(" ", "")
      .replace(emojiRegex, "");
    setValue(name, event.target.value);
    onHandleChange(event.target.value);
    onChange && onChange(event);
  };

  return (
    <div className={cn(styles["text-field"], validationClassname, classNames)}>
      <label htmlFor={id} className={styles["text-field__label"]}>
        {label && <p className={styles["text-field__label-text"]}>{label}</p>}
        <div className={styles["text-field__holder"]}>
          <input
            {...register(name)}
            {...props}
            id={id}
            name={name}
            type={isVisiblePassword ? "text" : "password"}
            className={styles["text-field__input"]}
            onChange={onHandleChangeField}
          />
          {values?.length ? (
            <Icon
              icon={isVisiblePassword ? IconEnum.Eye : IconEnum.Eye_Off}
              size={18}
              color="#8E8E93"
              onClick={() => setIsVisiblePassword(!isVisiblePassword)}
              className={styles["text-field__icon"]}
            />
          ) : null}
        </div>
      </label>
      {strength && !additionalLabel && values && !isTouched && (
        <p className={styles["text-field__requirements"]}>{strengthMessage}</p>
      )}
      <div className={styles["text-field__helper-box"]}>
        {isErrorValidation ? (
          <p className={styles["text-field__error-message"]}>
            {error.message as string}
          </p>
        ) : null}
        {additionalLabel && !isErrorValidation ? (
          <p className={styles["text-field__label-sub-text"]}>
            {additionalLabel}
          </p>
        ) : null}
        {helperLink ? (
          <Link
            href={helperLink.href}
            className={styles["text-field__helper-link"]}
          >
            {helperLink.text}
          </Link>
        ) : null}
      </div>
      {strength && passwordValue && values.length && passwordStrength >= 0 ? (
        <div
          className={cn(
            styles["strength-progress"],
            styles[`strength-progress--${typePasswordStrengthClassname}`]
          )}
        >
          {Array.from(Array(LENGTH_STRENGTH).keys()).map((item) => (
            <div
              key={item}
              className={cn(styles["strength-progress__item"], {
                [styles["strength-progress__item--active"]]:
                  item < passwordStrength,
              })}
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PasswordField;
