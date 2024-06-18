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
  const [isLoading, setIsLoading] = useState(false);
  const postModal = useModal();

  useEffect(() => {
    setIsLoading(true);
    privateApi(EndpointsEnum.Profile)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch(async () => {
        await logout();
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <ProfileContext.Provider
      value={{ user, setUser, setActive: postModal.setActive }}
    >
      {children}
      <Loader active={isLoading} />
      <PostForm {...postModal} user={user} enableSwipe type="create" />
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
