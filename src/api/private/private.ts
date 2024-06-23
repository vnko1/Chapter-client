import { EndpointsEnum } from "@/types";
import { getParsedSession, login, logout } from "@/lib/session";
import { CustomError } from "@/services";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const originalRequest = async (url: string, config: RequestInit = {}) => {
  const response = await fetch(BASE_URL + url, config);
  if (response.status === 204) return { response, data: null };
  const data = await response.json();

  return { response, data };
};

const refreshToken = async (refresh_token: string) => {
  try {
    const response = await fetch(BASE_URL + EndpointsEnum.Refresh_Token, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();

    await login(data.data.access_token, data.data.refresh_token);
    return data;
  } catch (error) {
    await logout();
  }
};

export const privateApi = async (url: string, config: RequestInit = {}) => {
  const { access_token, refresh_token } = await getParsedSession();
  if (access_token)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    };

  let { response, data } = await originalRequest(url, config);

  if (response.status === 401 && data.path !== EndpointsEnum.Password) {
    if (!refresh_token) await logout();
    const cred = await refreshToken(refresh_token as string);

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${cred.data.access_token}`,
    };

    const newRequest = await originalRequest(url, config);
    response = newRequest.response;
    data = newRequest.data;
  }

  if (!response.ok) throw new CustomError(data);
  return data;
};
