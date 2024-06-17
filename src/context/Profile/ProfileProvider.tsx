"use client";

import { FC, useEffect, useState } from "react";
import { EndpointsEnum, IUser } from "@/types";
import { privateApi } from "@/api";
import { logout } from "@/lib/session";

import { ProfileContext } from "./hook";
import { ProfileProviderProps } from "./ProfileProvider.type";

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    privateApi(EndpointsEnum.Profile)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(async () => {
        await logout();
      });
  }, []);

  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
