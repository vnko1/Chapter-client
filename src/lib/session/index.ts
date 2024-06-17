"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { defaultSession, JSONParser, sessionOptions, sleep } from "@/utils";
import { type SessionData } from "@/utils";
import { LinksEnum } from "@/types";

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.access_token = defaultSession.access_token;
  }

  if (shouldSleep) await sleep(250);

  return session;
}

export async function logout() {
  const session = await getSession(false);
  session.destroy();

  revalidatePath(LinksEnum.HOME);
}

export async function login(access_token: string) {
  const session = await getSession();

  session.access_token = access_token;
  session.isLoggedIn = true;
  await session.save();

  revalidatePath(LinksEnum.HOME);
  redirect(LinksEnum.HOME);
}

export async function getParsedSession() {
  const data = await getSession();
  return JSONParser(data);
}
