import React from "react";
import DonationsProvider from "./DonationsProvider";
import DonorProvider from "./DonorProvider";
import UserProvider from "./UserProvider";

export default function ProviderController({ children }) {
  return (
    <div>
    <UserProvider>
      <DonorProvider>
        <DonationsProvider>
            {children}
        </DonationsProvider>
      </DonorProvider>
    </UserProvider>
    </div>
  );
}
