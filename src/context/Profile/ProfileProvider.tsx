"use client";

import { FC, useState } from "react";
import { ProfileProviderProps } from "./ProfileProvider.type";
import { ProfileContext } from "./hook";
import { IUser } from "@/types";

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
