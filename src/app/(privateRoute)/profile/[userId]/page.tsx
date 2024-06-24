import React from "react";

function GuestProfilePage(searchParams: { userId: string }) {
  return <div>GuestProfilePage: {searchParams.userId}</div>;
}

export default GuestProfilePage;
