import { getSession } from "@/lib/actions/session";
import { ReactNode } from "react";

export default async function ChapterLayout({
  publicRoute,
  privateRoute,
}: {
  publicRoute: ReactNode;
  privateRoute: ReactNode;
}) {
  const { isLoggedIn } = await getSession();

  if (isLoggedIn) return privateRoute;

  return publicRoute;
}
