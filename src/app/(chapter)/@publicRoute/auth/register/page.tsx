import React from "react";
import { AuthLink, BlockAuth, Delimiter, GoogleAuth } from "../ui";
import { LinksEnum } from "@/types";

function RegisterPage() {
  return (
    <BlockAuth
      heading="Sign up"
      showBottomText={true}
      typePageText="Create new account"
    >
      <div className="max-w-[327px] w-full mx-auto">
        <Delimiter />
        <GoogleAuth />
        <AuthLink
          textMsg="Already have an account ?"
          linkMsg="Log in"
          link={LinksEnum.LOG_IN}
        />
      </div>
    </BlockAuth>
  );
}

export default RegisterPage;
