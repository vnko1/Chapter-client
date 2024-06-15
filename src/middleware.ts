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

  if (currentPath.endsWith(LinksEnum.HOME) && isLoggedIn)
    return NextResponse.rewrite(new URL(LinksEnum.DASHBOARD, req.url));

  if (currentPath.startsWith(LinksEnum.AUTH) && isLoggedIn)
    return NextResponse.rewrite(new URL(LinksEnum.DASHBOARD, req.url));

  if (currentPath.startsWith(LinksEnum.DASHBOARD) && !isLoggedIn)
    return NextResponse.rewrite(new URL(LinksEnum.LOG_IN, req.url));
}

export const config = {
  matcher: [
    "/((?!api|/terms|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)",
  ],
};
