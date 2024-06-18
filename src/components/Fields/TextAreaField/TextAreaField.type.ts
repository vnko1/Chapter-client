import { TextareaHTMLAttributes } from "react";

export type TextAreaFieldProps = {
  id: string;
  name: string;
  classNames?: string;
  label?: string;
  additionalLabel?: string;
  customErrorMessage?: string | null;
} & Partial<TextareaHTMLAttributes<HTMLTextAreaElement>>;
