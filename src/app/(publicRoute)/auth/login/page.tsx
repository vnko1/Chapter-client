import React from "react";

import { LinksEnum } from "@/types";
import { AuthLink, BlockAuth, Delimiter, GoogleAuth } from "../ui";
import { LoginForm } from "./ui";

async function LoginPage({
  searchParams,
}: {
  searchParams: { access_token?: string; refresh_token?: string };
}) {
  searchParams;
  return (
    <BlockAuth heading="Log in" showBottomText={true} typePageText="Log in">
      <div className="max-w-[327px] w-full mx-auto">
        <LoginForm
          access_token={searchParams.access_token}
          refresh_token={searchParams.refresh_token}
        />
        <Delimiter />
        <GoogleAuth />
        <AuthLink
          textMsg="Don`t have an account ?"
          linkMsg="Sign up"
          link={LinksEnum.SIGN_UP}
        />
      </div>
    </BlockAuth>
  );
}

export default LoginPage;
