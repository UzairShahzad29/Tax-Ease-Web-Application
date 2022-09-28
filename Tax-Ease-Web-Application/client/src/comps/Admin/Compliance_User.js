import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Users.css";
import { TiArrowLeftThick } from "react-icons/ti";
import { AiOutlineDownload } from "react-icons/ai";
import { BounceLoader } from "react-spinners";

const Comp_USER = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const ftechUser = async () => {
      try {
        const res = await axios.get(`/api/comp-user/comp/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      ftechUser();
    }, 5000);
  }, [id, setUser]);
  const hnadleStatus = async (e) => {
    try {
      axios.post(`/change-status/${user.id}`, { oId: user.oId, text: e });
    } catch (error) { }
  };

  return (
    <section className="aop-user">
      <Link to="/tax-ease-admin/comp" className="back-arrow">
        <TiArrowLeftThick />
      </Link>
      {user === undefined ? (
        <div className="loader-aop">
          <BounceLoader size={30} color="#ecf0f1" />
        </div>
      ) : (
        <div className="user-content-wrapper">
          <div className="user-files">
            <select
              onChange={(e) => hnadleStatus(e.target.value)}
              className="w-full p-2 mb-6"
            >
              <option>In progress</option>
              <option>Completed</option>
              <option>Invalid Document</option>
            </select>
            <h3
              style={{ color: "#fff", fontSize: "17px", marginBottom: "20px" }}
            >
              {user.email}
            </h3>
            <h3
              style={{ color: "#fff", fontSize: "17px", marginBottom: "20px" }}
            >
              {user.phone}
            </h3>
            <div className="file-wrapper">
              <img src={user.file} alt="file" />
              <div className="action-section">
                <a href={user.file} download>
                  <AiOutlineDownload />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <a
        className="px-4 py-2 bg-gray-300 -mt-[100px] text-gray-800 rounded-md"
        href={`mailto:${user?.email}?subject=Tip%20for%20Compliance&body=This%20is%20a%20message%20body`}
      >
        Suggest a Tip
      </a>
    </section>
  );
};

export default Comp_USER;
