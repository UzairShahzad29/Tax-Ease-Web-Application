import React from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { Link } from "react-router-dom";

const AOP_R = ({ aop }) => {
  return (
    <section className="users">
      <h2>AOP Requests</h2>
      <div className="user-data">
        {aop.map((aop, index) => (
          <div className="user-card" key={index}>
            <Link to={`/aop-user/${aop._id}`}>
              {" "}
              <BsArrowRightShort className="navi-btn" />
            </Link>
            <h3>
              <SiMinutemailer /> <span>{aop.business}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AOP_R;
