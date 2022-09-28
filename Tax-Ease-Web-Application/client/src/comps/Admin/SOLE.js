import React from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const SOLE = ({ sole }) => {
  return (
    <section className="users">
      <h2>sole propiriter Requests</h2>
      <div className="user-data">
        {sole.map((sole, index) => (
          <div className="user-card" key={index}>
            <Link to={`/sole-user/${sole._id}`}>
              <BsArrowRightShort className="navi-btn" />
            </Link>
            <h3>
              <SiMinutemailer /> <span>{sole.business}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SOLE;
