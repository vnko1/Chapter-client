import { Dispatch, SetStateAction } from "react";

export type ContactUsProps = {
  active: boolean;
  visible: boolean;
  close: () => void;
  setVisible: Dispatch<SetStateAction<boolean>>;
  title?: string;
};
