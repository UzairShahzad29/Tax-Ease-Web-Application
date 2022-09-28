import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = ({ sideBarRef, showSidebar }) => {
  return (
    <div className="admin-sidebar" ref={sideBarRef}>
      <nav>
        <Link to="/tax-ease-admin/main/" onClick={() => showSidebar()}>
          <span>Home</span>
        </Link>
        <Link to="/tax-ease-admin/users/" onClick={() => showSidebar()}>
          <span>All Users</span>
        </Link>
        <Link to="/tax-ease-admin/ntn/" onClick={() => showSidebar()}>
          <span>NTN requests</span>
        </Link>
        <Link to="/tax-ease-admin/aop/" onClick={() => showSidebar()}>
          <span>AOP requests</span>
        </Link>
        <Link to="/tax-ease-admin/comp/" onClick={() => showSidebar()}>
          <span>Compliance requests</span>
        </Link>
        <Link to="/tax-ease-admin/sole/" onClick={() => showSidebar()}>
          {" "}
          <span>Proprieter Requests</span>
        </Link>
        <Link to="/tax-ease-admin/tax-return/" onClick={() => showSidebar()}>
          <span>Tax Return</span>
        </Link>
        <Link
          to="/"
          onClick={() => {
            showSidebar();
            localStorage.removeItem("user");
          }}
        >
          <span>Logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
