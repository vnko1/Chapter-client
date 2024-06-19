import { MutableRefObject, RefObject } from "react";
import { ModalType } from "@/types";

export type UseSwipeProps = {
  lSwipe?: () => void;
  rSwipe?: () => void;
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
} & Pick<
  ModalType,
  "axis" | "touchDistinction" | "screenDimension" | "enableSwipe"
>;
