import { Outlet } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import React from "react";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
