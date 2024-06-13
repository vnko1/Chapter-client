"use server";

import { publicApi } from "@/api";
import { Endpoints } from "@/types";
import { tryCatchWrapper } from "@/utils";

export const emailCreate = tryCatchWrapper(
  async (email: string) =>
    await publicApi(Endpoints.Email_register, {
      method: "POST",
      body: JSON.stringify({ email }),
    })
);
