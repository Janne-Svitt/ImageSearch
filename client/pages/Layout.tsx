import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import { createContext, useState } from "react";
import FooterComp from "../src/components/FooterComp";

const ActiveTabContext = createContext("");

export const Layout = () => {
  const [ActiveTab, setActiveTab] = useState("Home");
  return (
    <>
      <ActiveTabContext.Provider value={ActiveTab}>
        <Navbar />
        <Outlet />
        <FooterComp />
      </ActiveTabContext.Provider>
    </>
  );
};
