import { SessionOptions } from "iron-session";

const ttl = process.env.AUTH_SESSION_TOKEN_LIFE as string;

export interface SessionData {
  access_token: string | null;
  refresh_token: string | null;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  access_token: null,
  refresh_token: null,
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  ttl: +ttl,
  password: process.env.AUTH_SESSION_PASS as string,
  cookieName: process.env.AUTH_SESSION_COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: +ttl - 60,
  },
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
