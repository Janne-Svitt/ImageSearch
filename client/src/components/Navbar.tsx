import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";
import AccountInfo from "./AccountInfo";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  return (
    <nav className=" bg-red-600 w-full h-20 fixed top-0 left-0">
      <NavLink className=" bg-slate-300 rounded-sm p-5" to="/">
        Home
      </NavLink>
      <NavLink className=" bg-slate-300 rounded-sm p-5" to="/fav">
        Favoriter
      </NavLink>
      {isAuthenticated ? (
        <>
          <h3 className=" float-start">{user?.name}</h3>
          <AccountInfo /> <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </nav>
  );
};

export default Navbar;
