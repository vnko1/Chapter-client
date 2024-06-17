"use client";

import { FC, useEffect, useState } from "react";
import { ProfileProviderProps } from "./ProfileProvider.type";
import { ProfileContext } from "./hook";
import { EndpointsEnum, IUser } from "@/types";
import { privateApi } from "@/api";

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    privateApi(EndpointsEnum.Profile).then((res) => {
      console.log("🚀 ~ privateApi ~ res:", res);
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ user, setUser }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
