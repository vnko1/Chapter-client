import { CustomError } from "@/services";
import axios from "axios";

export const axiosPublicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

export async function publicApi(endpoint: string, reqInit?: RequestInit) {
  const reqOpt = {
    ...reqInit,
    headers: {
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
