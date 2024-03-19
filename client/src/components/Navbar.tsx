import { NavLink, useLocation } from "react-router-dom";
import Login from "./Login";

const Navbar = () => {
  const ActiveTab = useLocation();

  const activeTab = `bg-neutral-900 to-neutral-900 inline-block shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] py-2 px-4 text-white font-semibold rounded-md`;

  const notActiveTab = `bg-neutral-900 rounded-md inline-block py-2 px-4 text-slate-300 shadow-[0_1px_4px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] hover:text-white hover:font-semibold  `;

  return (
    <nav
      className={`bg-neutral-900 w-[96%] m-auto mt-5 h-20 p-5 z-10 shadow-[0_4px_4px_rgba(0,0,0,0.6)] rounded-md`}
    >
      <ul className="flex gap-4">
        <li className="-mb-px mr-1">
          <NavLink
            className={ActiveTab.pathname === "/" ? activeTab : notActiveTab}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="-mb-px mr-1">
          <NavLink
            className={ActiveTab.pathname === "/fav" ? activeTab : notActiveTab}
            to="/fav"
          >
            Favorites Images
          </NavLink>
        </li>

        <li className="-mb-px mr-1">
          <NavLink
            className={
              ActiveTab.pathname === "/settings" ? activeTab : notActiveTab
            }
            to="/settings"
          >
            Settings
          </NavLink>
        </li>
        <div className=" absolute right-12 top-12">
          <Login />
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
