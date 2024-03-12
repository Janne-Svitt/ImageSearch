import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <section className=" h-full">
        <h1 className=" text-2xl text-center mb-5">
          - Welcome! - <br /> Please Login down below!
        </h1>
        <button
          className="h-10 w-20 m-auto bg-lime-500 rounded-md"
          onClick={() => loginWithRedirect()}
        >
          Log In
        </button>
      </section>
    </>
  );
};

export default LoginButton;
