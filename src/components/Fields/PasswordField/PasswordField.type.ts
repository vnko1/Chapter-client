import { InputHTMLAttributes } from "react";

export type PasswordFieldProps = {
  id: string;
  name: string;
  label?: string;
  strength?: boolean;
  classNames?: string;
  strengthMessage?: string;
  additionalLabel?: string;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;

export enum TypePasswordStrength {
  WEAK = "weak",
  OKEY = "okey",
  STRONG = "strong",
}
