import { InputHTMLAttributes } from "react";
import { Control } from "react-hook-form";

export type SearchFieldProps = {
  control: Control<{ query: string }>;
  classNames?: string;
  handleSearch?: (term: string) => void;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
