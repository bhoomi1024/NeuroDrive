import React from "react";
import Nav from "./components/HomePageCompo/Nav";
import { Outlet } from "react-router-dom";
import Footer from "./components/HomePageCompo/Nav";

function Layout() {
  return (
    <>     
      <Outlet />
    </>
  );
}

export default Layout;
