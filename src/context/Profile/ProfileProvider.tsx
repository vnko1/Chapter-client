"use client";
import { FC, useEffect, useState } from "react";

import { Loader, PostForm } from "@/components";
import { useModal } from "@/hooks";
import { EndpointsEnum, IUser } from "@/types";
import { privateApi } from "@/api";
import { logout } from "@/lib/session";

import { ProfileContext } from "./hook";
import { ProfileProviderProps } from "./ProfileProvider.type";

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const postModal = useModal();

  useEffect(() => {
    privateApi(EndpointsEnum.Profile)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(async () => {
        await logout();
      });
  }, []);

  if (!user) return <Loader active />;

  return (
    <ProfileContext.Provider
      value={{ user, setUser, setActive: postModal.setActive }}
    >
      {children}

      <PostForm {...postModal} user={user} enableSwipe />
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
