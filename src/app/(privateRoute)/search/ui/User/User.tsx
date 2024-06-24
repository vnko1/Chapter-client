import React, { FC } from "react";
import { UserProps } from "./User.type";

const User: FC<UserProps> = (props) => {
  console.log("🚀 ~ props:", props);
  return <div>User</div>;
};

export default User;
