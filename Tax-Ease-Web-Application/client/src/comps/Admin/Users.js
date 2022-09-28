import React from "react";
import "../../css/Dashboard.css";
import { BsArrowRightShort } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";
import { RiSmartphoneFill } from "react-icons/ri";

const Users = ({ users }) => {
  return (
    <section className="users">
      <h2>All Users</h2>
      <div className="user-data">
        {users.map((user, index) => (
          <div className="user-card" key={index}>
            <BsArrowRightShort className="navi-btn" />
            <h3>
              <SiMinutemailer /> <span>{user.email}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Users;
