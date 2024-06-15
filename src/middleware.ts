import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "./utils";

export async function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;

  const { isLoggedIn } = await getIronSession<SessionData>(
    cookies(),
    sessionOptions
  );

  if (currentPath === "/" && isLoggedIn)
    return NextResponse.rewrite(new URL("/dashboard", req.url));

  if (currentPath.startsWith("/auth") && isLoggedIn)
    return NextResponse.rewrite(new URL("/dashboard", req.url));

  if (currentPath.startsWith("/dashboard") && !isLoggedIn)
    return NextResponse.rewrite(new URL("/auth/login", req.url));
}

export const config = {
  matcher: [
    "/((?!api|/terms|_next/static|_next/image|.*\\.png$|.*\\.webp$|.*\\.svg$).*)",
  ],
};
