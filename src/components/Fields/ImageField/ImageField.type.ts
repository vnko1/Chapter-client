import { MutableRefObject } from "react";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

export type ImageFieldProps = {
  name: string;
  inputRef: MutableRefObject<HTMLInputElement | null>;
  previewUrl?: string | null;
  alt?: string;
  classNames?: string;
  previewClassNames?: string;
  disabled?: boolean;
  placeholder?: PlaceholderValue;
  sizes?: string;
  objectFit?: string;
  id: string;
};
