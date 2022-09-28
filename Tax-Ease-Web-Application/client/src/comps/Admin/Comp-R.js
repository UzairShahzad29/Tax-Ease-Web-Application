import React, { useState } from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const CompR = ({ comp }) => {
  return (
    <section className="users">
      <h2>Compliance Requests</h2>
      <div className="user-data">
        {comp.map((comp, index) => (
          <div className="user-card" key={index}>
            <Link to={`/comp/${comp._id}`}>
              {" "}
              <BsArrowRightShort className="navi-btn" />
            </Link>
            <h3>
              <SiMinutemailer /> <span>{comp.email}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompR;
