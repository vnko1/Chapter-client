import { IUser } from "@/types";

export type UserProps = Omit<
  IUser,
  "cookieAccepted" | "createdAt" | "updatedAt" | "deletedAt"
>;
