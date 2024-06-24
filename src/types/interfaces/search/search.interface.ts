import { IBook } from "../book/book.interface";
import { IPost } from "../post/post.interface";
import { IUser } from "../user/user.interface";

interface Count {
  count: number;
}
type User = Omit<
  IUser,
  "cookieAccepted" | "createdAt" | "updatedAt" | "deletedAt"
>;

interface UsersQuery extends Count {
  rows: Array<User>;
}

interface PostsQuery extends Count {
  rows: Array<IPost>;
}

interface BooksQuery extends Count {
  rows: Array<IBook>;
}

export interface SearchResponse {
  users: UsersQuery;
  posts: PostsQuery;
  books: BooksQuery;
}
