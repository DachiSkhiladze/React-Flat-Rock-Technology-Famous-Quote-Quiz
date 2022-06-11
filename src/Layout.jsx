import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({isSignedIn, isAdmin}) => {
  return (
    <>
      <Navbar isSignedIn = {isSignedIn}
              isAdmin = {isAdmin}/>
      <Outlet />
    </>
  );
};

export default Layout;