import { Dispatch, SetStateAction } from "react";

export type RestoreMessageProps = {
  deletedTimeStamp: string;
  email: string;
  setShowRestoreForm: Dispatch<SetStateAction<boolean>>;
};
