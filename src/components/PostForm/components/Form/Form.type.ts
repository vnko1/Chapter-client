import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../../validationSchema";

export type FormProps = {
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  previewUrl?: string | null;
} & UseFormReturn<FormValues>;
