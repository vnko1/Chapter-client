"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { defaultSession, JSONParser, sessionOptions, sleep } from "@/utils";
import { type SessionData } from "@/utils";
import { LinksEnum } from "@/types";

// const rTokenLife = process.env.REFRESH_TOKEN_LIFE as string;

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.access_token = defaultSession.access_token;
    session.refresh_token = defaultSession.refresh_token;
  }

  if (shouldSleep) await sleep(250);

  return session;
}

export async function logout() {
  const session = await getSession(false);
  session.destroy();
  // cookies().delete("refresh_token");
  revalidatePath(LinksEnum.HOME);
  redirect(LinksEnum.HOME);
}

export async function login(
  access_token: string,
  refresh_token: string,
  redirectUrl?: string
) {
  const session = await getSession();

  session.access_token = access_token;
  session.refresh_token = refresh_token;
  session.isLoggedIn = true;
  await session.save();
  // cookies().set("refresh_token", refresh_token, {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: "none",
  //   maxAge: +rTokenLife,
  // });
  revalidatePath(LinksEnum.HOME);
  redirectUrl && redirect(redirectUrl);
}

export async function getParsedSession() {
  const data = await getSession();
  return JSONParser(data);
}
