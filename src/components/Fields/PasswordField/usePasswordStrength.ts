"use client";
import { useState } from "react";
import { lowerUppercaseCharsValidation } from "@/utils";

const getEvaluatePassword = (password: string): number => {
  let score: number = 0;

  if (password.length >= 8) score += 1;
  if (password.match(/.*\d.*/g)) score += 1;
  if (password.match(lowerUppercaseCharsValidation)) score += 1;

  return score;
};

export function usePasswordStrength() {
  const LENGTH_STRENGTH = 3;
  const [passwordStrength, setPasswordStrength] = useState<number>(-1);
  const [passwordValue, setPasswordValue] = useState<string>("");

  function onHandleChange(value: string) {
    if (value === "") {
      setPasswordStrength(0);
      setPasswordValue("");
      return;
    }
    setPasswordStrength(getEvaluatePassword(value));
    setPasswordValue(value);
  }

  return {
    LENGTH_STRENGTH,
    passwordStrength,
    passwordValue,
    onHandleChange,
  };
}
