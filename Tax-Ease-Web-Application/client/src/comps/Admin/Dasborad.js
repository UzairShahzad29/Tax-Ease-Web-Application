import React, { useRef } from "react";
import "../../css/Dashboard.css";
import AdminSidebar from "./AdminSidebar";
import { CgMenuGridO } from "react-icons/cg";
import { Outlet } from "react-router-dom";

const Dasborad = () => {
  const sideBarRef = useRef(null);

  const showSidebar = () => {
    sideBarRef.current.classList.toggle("showSidebar");
  };

  return (
    <section className="dashboard">
      <button onClick={showSidebar}>
        <CgMenuGridO />
      </button>
      <AdminSidebar sideBarRef={sideBarRef} showSidebar={showSidebar} />
      <Outlet />
    </section>
  );
};

export default Dasborad;
