import { Header } from "@/app/ui";
import React, { ReactNode } from "react";

function PublicRouteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default PublicRouteLayout;
