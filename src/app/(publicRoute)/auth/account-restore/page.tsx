import React from "react";

function AccountRestorePage({
  searchParams,
}: {
  searchParams: { deleted?: string };
}) {
  return <div>{searchParams.deleted}</div>;
}

export default AccountRestorePage;
