import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./utils";
import { LinksEnum } from "./types";

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  const { isLoggedIn } = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  if (isLoggedIn) {
    if (currentPath.endsWith(LinksEnum.HOME))
      return NextResponse.rewrite(new URL(LinksEnum.DASHBOARD, req.url));

    if (currentPath.startsWith(LinksEnum.AUTH))
      return NextResponse.rewrite(new URL(LinksEnum.DASHBOARD, req.url));
  }

  if (!isLoggedIn) {
    if (currentPath.startsWith(LinksEnum.DASHBOARD))
      return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
    if (currentPath.startsWith(LinksEnum.SEARCH))
      return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
    if (currentPath.startsWith(LinksEnum.SETTINGS))
      return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
    if (currentPath.startsWith(LinksEnum.PROFILE))
      return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
    if (currentPath.startsWith(LinksEnum.POST))
      return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|/terms|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)",
  ],
};
