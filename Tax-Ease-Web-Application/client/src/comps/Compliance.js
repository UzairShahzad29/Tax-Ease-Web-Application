import React, { useState } from "react";
import { useGlobalContext } from "../AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import Alert from "./Alert";
import { convertBinary } from "../utilities";

const Compliance = () => {
  const [notice, setNotice] = useState(null);
  const [processing, setprocessing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { msg, showMsg, cart, getUser, setCart, toggleCart, addOrder } =
    useGlobalContext();

  const handleFile = (e) => {
    setNotice(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (notice === null) {
      showMsg(true, "danger", "upload Notice copy");
      return;
    }
    setprocessing(true);
    const user = await getUser(id);
    if (user) {
      const file = await convertBinary(notice);

      const data = {
        id,
        email: user.email,
        phone: user.phone,
        file,
      };

      try {
        const res = await fetch("/user/compliance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success === true) {
          setprocessing(false);
          showMsg(true, "success", result.message);
          addOrder(
            {
              id: Math.random() * 100000,
              title: "Compliance Audit",
              status: "pending",
            },
            id
          );
          setCart([
            ...cart,
            {
              id: Math.floor(Math.random() * 1000000),
              title: "Compliance Audit charges",
              price: 100,
            },
          ]);
          const timeout = setTimeout(() => {
            toggleCart();
            navigate(`/user/${id}/services`);
          }, 2000);
          return () => clearTimeout(timeout);
        }
      } catch (error) {
        showMsg(true, "danger", error);
      }
    }
  };

  return (
    <div className="w-full py-8">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center gap-5">
          {msg.show && <Alert {...msg} removeAlert={showMsg} />}
          <h1 className="text-xl tracking-wider font-main font-[800] uppercase text-primary">
            FBR Compliance Audit Notice
          </h1>
          <p className="text-sm text-gray-400 capitalize font-main">
            upload notice copy
          </p>
          <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
            <h3 className="text-xs font-main uppercase tracking-widest text-gray-400 font-[700]">
              Notice Copy
            </h3>
            <input
              type="file"
              className="text-xs text-center text-gray-400 file:hidden"
              onChange={handleFile}
            />
          </label>
          <button
            className="w-[300px] h-[50px] text-center font-[700] text-sm bg-primary rounded-full text-white"
            onClick={handleUpload}
          >
            {processing ? (
              <span className="flex items-center justify-center w-full">
                <Audio
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="audio-loading"
                  wrapperStyle={{}}
                  wrapperClass="wrapper-class"
                  visible={true}
                />
              </span>
            ) : (
              "Upload Notice"
            )}
          </button>
          <Link
            to={`/user/${id}/services`}
            className="w-[300px] h-[50px] font-[700] flex items-center justify-center text-sm bg-primary rounded-full text-white"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Compliance;
