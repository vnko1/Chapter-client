import { IUser } from "@/types";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type ProfileProviderProps = { children: ReactNode };

export type ProfileContextType = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
};
