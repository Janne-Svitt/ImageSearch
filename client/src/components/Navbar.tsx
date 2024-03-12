import { NavLink, useLocation } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const ActiveTab = useLocation();
  const navbarColor = `bg-[#272727]`;
  return (
    <nav
      className={`${navbarColor} w-full h-20 fixed border top-0 left-0 p-5 z-10`}
    >
      <ul className="flex  border-slate-50 border-b ">
        <li className="-mb-px mr-1">
          <NavLink className="" to="/">
            <a
              className={
                ActiveTab.pathname === "/"
                  ? `${navbarColor} inline-block  border-slate-50 border-l border-t border-r rounded-t py-2 px-4 text-white font-semibold`
                  : `${navbarColor} inline-block py-2 px-4 text-slate-500 hover:text-white font-semibold`
              }
              href="#"
            >
              Home
            </a>
          </NavLink>
        </li>
        <li className="-mb-px mr-1">
          <NavLink className=" " to="/fav">
            <a
              className={
                ActiveTab.pathname === "/fav"
                  ? `${navbarColor} inline-block  border-slate-50 border-l border-t border-r rounded-t py-2 px-4 text-white font-semibold`
                  : `${navbarColor} inline-block py-2 px-4 text-slate-500 hover:text-white font-semibold`
              }
              href="#"
            >
              Favourites Images
            </a>
          </NavLink>
        </li>

        <li className="-mb-px mr-1">
          <NavLink className=" " to="/settings">
            <a
              className={
                ActiveTab.pathname === "/settings"
                  ? `${navbarColor} inline-block  border-slate-50 border-l border-t border-r rounded-t py-2 px-4 text-white font-semibold`
                  : `${navbarColor} inline-block py-2 px-4 text-slate-500 hover:text-white font-semibold`
              }
              href="#"
            >
              Settings
            </a>
          </NavLink>
        </li>
      </ul>
      <div className="absolute right-10 top-5">
        <Login />
      </div>
    </nav>
  );
};

export default Navbar;
