import {
  ButtonColorType,
  ButtonSizeType,
  ButtonVariantType,
} from "@/components/Buttons/UIButton/UIButton.type";

export type GoogleAuthProps = {
  classNames?: string;
  text?: string;
  buttonColor?: ButtonColorType;
  buttonVariant?: ButtonVariantType;
  buttonSize?: ButtonSizeType;
  iconSize?: number;
};
