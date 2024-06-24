import { IBook } from "../book/book.interface";

export interface IUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  nickName: string;
  status: string | null;
  location: string | null;
  avatarUrl: string | null;
  cookieAccepted: boolean;
  userBooks: IBook[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null | Date;
}
