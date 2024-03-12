import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import { createContext, useState } from "react";

const ActiveTabContext = createContext("");

export const Layout = () => {
  const [ActiveTab, setActiveTab] = useState("Home");
  return (
    <>
      <ActiveTabContext.Provider value={ActiveTab}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </ActiveTabContext.Provider>
    </>
  );
};
