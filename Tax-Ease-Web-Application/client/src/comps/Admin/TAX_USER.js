import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../css/Users.css";
import { TiArrowLeftThick } from "react-icons/ti";
import { BounceLoader } from "react-spinners";
import { AiOutlineDownload } from "react-icons/ai";

const AOP_USER = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    const ftechUser = async () => {
      try {
        const res = await axios.get(`/api/tax-user/tax/${id}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    setTimeout(() => {
      ftechUser();
    }, 5000);
  }, [id, setUser]);

  return (
    <section className="aop-user">
      <Link to="/tax-ease-admin/main" className="back-arrow">
        <TiArrowLeftThick />
      </Link>
      {user === undefined ? (
        <div className="loader-aop">
          <BounceLoader size={30} color="#ecf0f1" />
        </div>
      ) : (
        <div className="tax-content-wrapper">
          <h3>User Bio Data</h3>
          <ul>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Phone: {user.phone}</li>
            <li>CNIC: {user.cnic}</li>
            <li>Nationality: {user.nationality}</li>
            <li>Occupation: {user.occupation}</li>
          </ul>
          <h3>User Income Source</h3>
          <ul>
            {user.incomeType.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
            {user?.businessType && <h5>{user?.businessType}</h5>}
            {user?.annual && <h5>{`Annual Net Income: ${user?.annual}`}</h5>}
          </ul>
          <h3>User withholding tax deduction</h3>
          <ul>
            {user.taxesData.map((i, index) => (
              <li key={index}>{i}</li>
            ))}
          </ul>
          <h3>NTN Credentials</h3>
          <ul>
            <li>NTN Username: {user.ntnUsername}</li>
            <li>NTN Number: {user.ntnNumber}</li>
            <li>NTN Pin: {user.ntnPin}</li>
            <li>NTN Pass: {user.ntnPassword}</li>
          </ul>

          <div>
            <h3>Income Source Document</h3>
            {user.docs.map((file, index) => (
              <div className="file-wrapper" key={index}>
                <img src={file} alt={`file`} />
                <div className="action-section">
                  <a href={file} download>
                    <AiOutlineDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>Tax Deduction Document</h3>
            {user.taxDOcs.map((file, index) => (
              <div className="file-wrapper" key={index}>
                <img src={file} alt={`file`} />
                <div className="action-section">
                  <a href={file} download>
                    <AiOutlineDownload />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="file-wrapper">
            <h3>Bank statement</h3>
            <img src={user.bankState} alt={`bankState`} />
            <div className="action-section">
              <a href={user.bankState} download>
                <AiOutlineDownload />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AOP_USER;
