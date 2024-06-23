// import axios, { AxiosResponse } from "axios";

import { EndpointsEnum } from "@/types";
import { getSession, login, logout } from "@/lib/session";
import { CustomError } from "@/services";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

// export const privateApi = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,

//   headers: {
//     "X-Requested-With": "XMLHttpRequest",
//     "Content-Type": "application/x-www-form-urlencoded",
//   },
// });

// privateApi.interceptors.request.use(
//   async (config) => {
//     const { access_token } = await getParsedSession();

//     if (access_token)
//       config.headers.Authorization = "Bearer" + " " + access_token;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// privateApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const { access_token, refresh_token } = await getParsedSession();

//     if (!access_token) {
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config;
//     console.log(error.response.data.path);
//     if (
//       error.response.status === 401 &&
//       error.response.data.path !== EndpointsEnum.Password &&
//       error.config &&
//       !originalRequest._retry
//     ) {
//       error.config._isRetry = true;
//       try {
//         const res: AxiosResponse = await axios.post(
//           BASE_URL + EndpointsEnum.Refresh_Token,
//           { refresh_token },
//           {
//             withCredentials: true,
//           }
//         );

//         await login(res.data.data.access_token, res.data.data.refresh_token);

//         return privateApi.request(originalRequest);
//       } catch (e) {
//         logout();
//         return Promise.reject(error);
//       }
//     }
//     throw error;
//   }
// );

const originalRequest = async (url: string, config: RequestInit = {}) => {
  const response = await fetch(BASE_URL + url, config);
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
    // console.log("🚀 ~ refreshToken ~ data:", data);
    await login(data.data.access_token, data.data.refresh_token);
    return data;
  } catch (error) {
    // console.log("🚀 ~ refreshToken ~ error:", error);
    await logout();
  }
};

export const privateApi = async (url: string, config: RequestInit = {}) => {
  const { access_token, refresh_token } = await getSession();
  if (access_token)
    config.headers = {
      Authorization: `Bearer ${access_token}`,
    };

  let { response, data } = await originalRequest(url, config);
  if (response.status === 401 && data.path !== EndpointsEnum.Password) {
    if (!refresh_token) await logout();
    const cred = await refreshToken(refresh_token as string);

    config.headers = {
      Authorization: `Bearer ${cred.data.access_token}`,
    };

    const newRequest = await originalRequest(url, config);
    response = newRequest.response;
    data = newRequest.data;
  }

  if (response.status === 204) return null;

  if (!response.ok) throw new CustomError(data);
  return data;
};
