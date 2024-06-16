"use server";

import { publicApi } from "@/api";
import { EndpointsEnum } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const emailCreate = tryCatchWrapper(
  async (email: string) =>
    await publicApi(EndpointsEnum.Email_register, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
);

export const emailConfirm = tryCatchWrapper(
  async ({ otp, userId }: { otp: string; userId: string }) =>
    await publicApi(EndpointsEnum.Email_confirm + "/" + userId, {
      method: "POST",
      body: JSON.stringify({ otp }),
    })
);

export const resentOtp = tryCatchWrapper(
  async (email: string) =>
    await publicApi(EndpointsEnum.Resent_otp, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
);

export const nicknameValidate = tryCatchWrapper(
  async (nickName: string) =>
    await publicApi(EndpointsEnum.Nickname_validation, {
      method: "POST",
      body: JSON.stringify({ nickName }),
    })
);

type AccountData = {
  firstName: string;
  lastName: string;
  nickName: string;
  password: string;
  userId: string;
  cookieAccepted: boolean;
};

export const accountCreate = tryCatchWrapper(
  async (data: AccountData) =>
    await publicApi(EndpointsEnum.Account_create + "/" + data.userId, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
);

type LoginData = { email: string; password: string };
export const signIn = tryCatchWrapper(
  async (data: LoginData) =>
    await publicApi(EndpointsEnum.Login, {
      method: "POST",
      body: JSON.stringify(data),
    })
);

export const resetPassword = tryCatchWrapper(
  async (email: string) =>
    await publicApi(EndpointsEnum.Reset_pass, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
);

type ChangePass = { password: string; otp: string };
export const changePassword = tryCatchWrapper(async (data: ChangePass) =>
  publicApi(EndpointsEnum.Update_pass, {
    method: "PATCH",
    body: JSON.stringify(data),
  })
);

export const restoreAccount = tryCatchWrapper(async (email: string) =>
  publicApi(EndpointsEnum.Restore_acc, {
    method: "POST",
    body: JSON.stringify({ email }),
  })
);

export const confirmAccountRestore = tryCatchWrapper(async (otp: string) =>
  publicApi(EndpointsEnum.Confirm_restore_acc, {
    method: "POST",
    body: JSON.stringify({ otp }),
  })
);
