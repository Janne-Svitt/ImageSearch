import { useAuth0 } from "@auth0/auth0-react";
import { FaLock } from "react-icons/fa";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <>
      <main className="flex min-h-[500px]  p-5 text-white">
        <div className=" justify-center m-auto bg-neutral-900 rounded-md h-2/3 w-1/2 flex flex-col p-20 shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <div className=" bg-neutral-900 m-auto rounded-md shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] h-[140px] w-[140px] p-4">
            <FaLock
              style={{
                margin: "auto",
                fontSize: "100px",
              }}
            />
          </div>
          <h1 className="text-2xl self-center m-5 ">
            Please login to continue!
          </h1>

          <button
            className=" bg-neutral-900 w-28 p-3 rounded-md mt-5 self-center shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-center hover:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] hover:text-sm hover:p-4"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
