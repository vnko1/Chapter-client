import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  id: string;
  name: string;
  classNames?: string;
  label?: string;
  showSuccessIcon?: boolean;
  additionalLabel?: string;
  customErrorMessage?: string | null;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
