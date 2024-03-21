import { useAuth0 } from "@auth0/auth0-react";
import { FaCircleUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const { isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated ? (
        <button
          className=""
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <IoLogOut style={{ fontSize: "30px", color: "white" }} />
        </button>
      ) : (
        <button className="" onClick={() => loginWithRedirect()}>
          <FaCircleUser style={{ fontSize: "30px", color: "white" }} />
        </button>
      )}
    </>
  );
};

export default Login;
