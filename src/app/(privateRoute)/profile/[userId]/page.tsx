import React from "react";

function GuestProfilePage({ params }: { params: { userId: string } }) {
  return <div>GuestProfilePage: {params.userId}</div>;
}

export default GuestProfilePage;
