"use server";

import { privateApi } from "@/api";
import { logout } from "@/lib/session";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const getMe = tryCatchWrapper(
  async () =>
    await privateApi(EndpointsEnum.Profile, { next: { tags: ["profile"] } })
);

export const editProfile = tryCatchWrapper(
  async (data: FormData) =>
    await privateApi(EndpointsEnum.Profile, {
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: data,
      method: "PATCH",
    })
);

export const updateUserPassword = tryCatchWrapper(
  async (pass: { password: string; newPassword: string }) =>
    await privateApi(EndpointsEnum.Password, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
      },
      method: "PATCH",
      body: JSON.stringify(pass),
    })
);

export const deleteUserAccount = tryCatchWrapper(async () => {
  await privateApi(EndpointsEnum.Profile, { method: "DELETE" });
  await logout();
});

export const subscribeToggler = tryCatchWrapper(
  async (userId: string) =>
    await privateApi(EndpointsEnum.Subscribe + "/" + userId, { method: "PUT" })
);
