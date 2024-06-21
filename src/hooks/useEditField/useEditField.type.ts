import { RefObject } from "react";

export type EditFieldType = {
  fieldType: "fullName" | "status";
  text: string | null;
  nodeRef: RefObject<HTMLTextAreaElement | HTMLInputElement>;
  stringLength?: number;
};
