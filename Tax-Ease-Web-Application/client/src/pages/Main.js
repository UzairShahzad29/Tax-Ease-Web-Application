import React from "react";
import Navbar from "../comps/Navbar";
import { Outlet, Navigate } from "react-router-dom";

const Main = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    return (
      <div className="w-full h-screen">
        <Navbar />
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default Main;
