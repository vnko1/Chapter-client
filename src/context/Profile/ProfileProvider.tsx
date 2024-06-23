"use client";
import { FC, useEffect, useState } from "react";

import { Loader, PostForm } from "@/components";
import { useModal } from "@/hooks";
import { IUser } from "@/types";
import { getMe } from "@/lib/actions";

import { ProfileContext } from "./hook";
import { ProfileProviderProps } from "./ProfileProvider.type";

const ProfileProvider: FC<ProfileProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const postModal = useModal();

  useEffect(() => {
    getMe(undefined).then((res) => {
      setUser(res.data);
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
