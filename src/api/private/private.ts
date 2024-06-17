import axios, { AxiosResponse } from "axios";

import { EndpointsEnum } from "@/types";
import { getParsedSession } from "@/lib/session";
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  method: "get, post, put, delete, patch",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});

api.interceptors.request.use(
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { access_token } = await getParsedSession();

    if (!access_token) return Promise.reject(error);

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      error.config &&
      !originalRequest._retry
    ) {
      error.config._isRetry = true;
      try {
        const {
          data: { token },
        }: AxiosResponse<CredType> = await axios.post(
          BASE_URL + EndpointsEnum.Refresh_Token,
          null,
          {
            withCredentials: true,
          }
        );
        // await handleAuth(token);

        return api.request(originalRequest);
      } catch (e) {
        // logout();
        return Promise.reject(error);
      }
    }
    throw error;
  }
);

export default api;
