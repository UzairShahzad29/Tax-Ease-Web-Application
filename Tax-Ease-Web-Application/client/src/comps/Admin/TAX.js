import React from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const TAX = ({ tax }) => {
  return (
    <section className="users">
      <h2>tax Return</h2>
      <div className="user-data">
        {tax.map((tax, index) => (
          <div className="user-card" key={index}>
            <Link to={`/tax-user/${tax._id}`}>
              <BsArrowRightShort className="navi-btn" />
            </Link>
            <h3>
              <SiMinutemailer /> <span>{tax.name}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TAX;
