"use client";
import { FC, useEffect, useState } from "react";

import { Loader } from "@/components";
import { EndpointsEnum, IUser } from "@/types";
import { privateApi } from "@/api";
import { logout } from "@/lib/session";

import { ProfileContext } from "./hook";
import { ProfileProviderProps } from "./ProfileProvider.type";
import { useModal } from "@/hooks";
import { CreatePost } from "./components";

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
      <CreatePost {...postModal} user={user} enableSwipe />
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
