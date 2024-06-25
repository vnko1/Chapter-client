import { IUser } from "@/types";

export type UserProps = Omit<
  IUser,
  "cookieAccepted" | "createdAt" | "updatedAt" | "deletedAt"
> & { showFollowButton?: boolean; type?: "page" | "popup" };
