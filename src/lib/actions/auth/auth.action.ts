// "use server";

import { publicApi } from "@/api";
import { Endpoints } from "@/types";

export async function emailCreate(email: string) {
  return await publicApi.post(Endpoints.Email_register, { email });
}
