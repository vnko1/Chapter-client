import { ProfileProvider } from "@/context";
import React, { ReactNode } from "react";

function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <ProfileProvider>
      <main>{children}</main>
    </ProfileProvider>
  );
}

export default PrivateLayout;
