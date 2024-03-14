import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import "../src/Home.css";

function FavImg() {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return (
      <main className="flex w-full h-screen p-5 text-white">
        <div className="m-auto shadow-[0_1px_4px_rgba(0,0,0,0.6)] bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-md w-full h-full flex flex-col p-20">
          <h1>Welcome! FavTemplate.</h1>
        </div>
      </main>
    );
  } else {
    return <Navigate to="/Login" replace={true} />;
  }
}

export default FavImg;
