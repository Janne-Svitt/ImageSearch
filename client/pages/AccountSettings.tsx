import { useAuth0 } from "@auth0/auth0-react";
import AccountInfo from "../src/components/AccountInfo";
import "../src/index.css";
import { Navigate } from "react-router-dom";

const AccountSettings = () => {
  const { isAuthenticated } = useAuth0();

  if (isAuthenticated) {
    return (
      <main className="flex w-full p-5">
        <article className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-1/3 p-10  shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          <AccountInfo />
        </article>
        <div className="flex h-screen mr-2 ml-2">
          <div className="m-auto">
            <div className="m-auto mt-4 mb-4 rounded-lg w-2 h-2 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
            <div className="m-auto mt-4 mb-4 rounded-lg w-2 h-2 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
            <div className="m-auto mt-4 mb-4 rounded-lg w-2 h-2 shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
          </div>
        </div>
        <article className="bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-2/3 p-10  shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="w-full h-full rounded-md shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]"></div>
        </article>
      </main>
    );
  } else {
    return <Navigate to="/Login" replace={true} />;
  }
};

export default AccountSettings;
