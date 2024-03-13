import { NavLink, useLocation } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const ActiveTab = useLocation();

  const activeTab = `bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 inline-block  border-gray-500 border-l border-t border-r rounded-t py-2 px-4 text-white font-semibold `;

  const notActiveTab = `bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 rounded-t inline-block py-2 px-4 text-slate-300 hover:text-white font-semibold `;

  return (
    <nav
      className={`bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 w-full h-20 top-0 left-0 p-5 z-10`}
    >
      <ul className="flex  border-gray-500 border-b ">
        <li className="-mb-px mr-1">
          <NavLink className="" to="/">
            <a
              className={ActiveTab.pathname === "/" ? activeTab : notActiveTab}
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
                ActiveTab.pathname === "/fav" ? activeTab : notActiveTab
              }
              href="#"
            >
              Favorites Images
            </a>
          </NavLink>
        </li>

        <li className="-mb-px mr-1">
          <NavLink className=" " to="/settings">
            <a
              className={
                ActiveTab.pathname === "/settings" ? activeTab : notActiveTab
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
