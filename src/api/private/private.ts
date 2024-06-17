import axios, { AxiosResponse } from "axios";

import { EndpointsEnum } from "@/types";
import { getParsedSession, login, logout } from "@/lib/session";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const privateApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,

  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

privateApi.interceptors.request.use(
  async (config) => {
    const { access_token } = await getParsedSession();

    if (access_token)
      config.headers.Authorization = "Bearer" + " " + access_token;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { access_token } = await getParsedSession();

    if (!access_token) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      error.config._isRetry = true;
      try {
        const res: AxiosResponse = await axios.post(
          BASE_URL + EndpointsEnum.Refresh_Token,
          null,
          {
            withCredentials: true,
          }
        );

        await login(res.data.data.access_token, res.data.data.refresh_token);

        return privateApi.request(originalRequest);
      } catch (e) {
        logout();
        return Promise.reject(error);
      }
    }
    throw error;
  }
);