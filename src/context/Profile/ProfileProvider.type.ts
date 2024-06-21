import { IUser } from "@/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type ProfileProviderProps = { children: ReactNode };

export type ProfileContextType = {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setActive: Dispatch<SetStateAction<boolean>>;
};
