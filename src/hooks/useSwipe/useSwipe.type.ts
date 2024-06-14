import { ModalProps } from "@/types";
import { MutableRefObject, RefObject } from "react";

export type UseSwipeProps = {
  lSwipe?: () => void;
  rSwipe?: () => void;
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
} & Pick<
  ModalProps,
  "axis" | "touchDistinction" | "enableSwipeOnScreen" | "enableSwipe"
>;
