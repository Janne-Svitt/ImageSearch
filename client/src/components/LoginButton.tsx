import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <button
        className="h-10 w-20 m-auto bg-lime-500 rounded-md"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </>
  );
};

export default LoginButton;
