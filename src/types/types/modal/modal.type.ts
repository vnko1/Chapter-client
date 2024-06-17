import { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  close: () => void;
  children: ReactNode;
  active: boolean;
  visible: boolean;
  classNames?: string;
  activeClassNames?: string;
  axis?: "clientX" | "clientY";
  touchDistinction?: number;
  enableSwipeOnScreen?: number;
  enableSwipe?: boolean;
};
