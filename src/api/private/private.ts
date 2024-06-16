import { cookies } from "next/headers";
import { CustomError } from "@/services";
import { getSession } from "@/lib/session";
import { EndpointsEnum } from "@/types";

export async function privateApi(endpoint: string, reqInit?: RequestInit) {
  const { access_token } = await getSession();
  const reqOpt = {
    ...reqInit,
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
    },
  };

  const res = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + endpoint,
    reqOpt
  );

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) throw new CustomError(data);

  return data;
}
