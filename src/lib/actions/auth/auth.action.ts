import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { defaultSession, sessionOptions, sleep } from "@/services";
import { type SessionData } from "@/services";

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
  "use server";

  const session = await getSession(false);
  session.destroy();
  revalidatePath("/app-router-server-component-and-action");
}

export async function login(token: string) {
  "use server";

  const session = await getSession();
  session.access_token = token;
  session.isLoggedIn = true;
  await session.save();
  revalidatePath("/");
}
