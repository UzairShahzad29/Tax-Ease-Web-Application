import React from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const NTN = ({ ntn }) => {
  return (
    <section className="users">
      <h2>ntn Requests</h2>
      <div className="user-data">
        {ntn.map((ntn, index) => (
          <div className="user-card" key={index}>
            <Link to={`/ntn-user/${ntn._id}`}>
              <BsArrowRightShort className="navi-btn" />
            </Link>
            <h3>
              <SiMinutemailer /> <span>{ntn.email}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NTN;
