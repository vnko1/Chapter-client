import React from "react";

import { BlockAuth, CookieToast } from "../../ui";
import { AccountForm } from "../ui";

function AccountCreationPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <>
      <BlockAuth heading="Create account">
        <AccountForm userId={userId} />
      </BlockAuth>
      <CookieToast />
    </>
  );
}

export default AccountCreationPage;
