import React from "react";
import "../../css/Dashboard.css";
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";

const MainSec = ({ aop, users, sole, tax, ntn, comp, lawyers }) => {
  return (
    <section className="main-admin">
      <h1>dashborad</h1>
      <div className="main-content">
        <div className="card card-1">
          <Link to="/tax-ease-admin/users">
            <BsArrowRightShort />
          </Link>
          <h2>{users.length}</h2>
          <h3>All users</h3>
        </div>
        <div className="card card-2">
          <Link to="/tax-ease-admin/ntn">
            <BsArrowRightShort />
          </Link>
          <h2>{ntn.length}</h2>
          <h3>NTN Regis ....</h3>
        </div>
        <div className="card card-3">
          <Link to="/tax-ease-admin/aop">
            <BsArrowRightShort />
          </Link>
          <h2>{aop.length}</h2>
          <h3>AOP Regis ....</h3>
        </div>
        <div className="card card-4">
          <Link to="/tax-ease-admin/sole">
            <BsArrowRightShort />
          </Link>
          <h2>{sole.length}</h2>
          <h3>SOLE Regis ....</h3>
        </div>
        <div className="card card-1">
          <Link to="/tax-ease-admin/comp">
            <BsArrowRightShort />
          </Link>
          <h2>{comp.length}</h2>
          <h3>Compliance ....</h3>
        </div>
        <div className="card card-5">
          <Link to="/tax-ease-admin/tax-return">
            <BsArrowRightShort />
          </Link>
          <h2>{tax.length}</h2>
          <h3>Tax return</h3>
        </div>
      </div>
    </section>
  );
};

export default MainSec;
