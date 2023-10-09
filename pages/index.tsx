import { Inter } from "next/font/google";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { authScopes } from "./api/authConfig";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { instance, accounts } = useMsal();
  const [accountDetails, setAccountDetails] = useState(Object);

  const handleLogin = () => {
    instance
      .loginPopup(authScopes)
      .then((response) => {
        instance.setActiveAccount(response.account);
        setAccountDetails(response.account);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleLogout = () => {
    instance
      .logoutPopup()
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <main className={`min-h-screen ${inter.className}`}>
      <div className="pt-6 px-24">
        <AuthenticatedTemplate>
          <h6>You're logged in!</h6>
          {accountDetails && <center>Name: {accountDetails?.name}</center>}
          <button onClick={() => handleLogout()}>Logout</button>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>Please log in</p>

          <button onClick={() => handleLogin()}>Login</button>
        </UnauthenticatedTemplate>
      </div>
    </main>
  );
}
