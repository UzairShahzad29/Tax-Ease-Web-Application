import React, { useState } from "react";
import { useGlobalContext } from "../AppContext";
import Alert from "./Alert";
import { Audio } from "react-loader-spinner";
import { Link, useParams } from "react-router-dom";
import { convertBinary } from "../utilities";

const NTNReg = () => {
  const [cnic, setCnic] = useState({
    front: null,
    back: null,
  });

  const { id } = useParams();
  const {
    msg,
    showMsg,
    ntnRegistration,
    cart,
    getUser,
    setCart,
    toggleCart,
    addOrder,
  } = useGlobalContext();

  const handleFile = (e) => {
    setCnic({
      ...cnic,
      [e.target.name]: e.target.files[0],
    });
  };

  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const fileData = [];
    if (cnic.front === null || cnic.back === null) {
      showMsg(true, "danger", "Upload Documents");
      return;
    }
    setLoading(true);
    const user = await getUser(id);
    console.log("USER --------->", user);
    if (user) {
      const files = Object.values(cnic);

      for (const file of files) {
        const result = await convertBinary(file);
        fileData.push(result);
      }
      console.log("File data -------------> ", fileData);
      const oId = Math.floor(Math.random() * 10000000);
      if (fileData.length === 2) {
        const data = {
          id: user._id,
          email: user.email,
          fileData,
          oId,
        };
        const res = await ntnRegistration(data);
        if (res.success === true) {
          setLoading(false);
          showMsg(true, "success", res.message);
          addOrder(
            {
              title: "Ntn Registration",
              status: "pending",
              oId,
            },
            id
          );
          setCart([
            ...cart,
            {
              id: Math.floor(Math.random() * 1000000),
              title: "Ntn reistration charges",
              price: 3000,
            },
          ]);
          const timeout = setTimeout(() => {
            toggleCart();
            setCnic({
              front: null,
              back: null,
            });
          }, 2000);
          return () => clearTimeout(timeout);
        }
      }
    }
  };

  return (
    <div className="w-full py-8">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center gap-5">
          {msg.show && <Alert {...msg} removeAlert={showMsg} />}
          <div>
            <img
              src="/images/NTN-Services.png"
              alt="ntn"
              className="w-[300px] h-[100px] object-contain"
            />
          </div>
          <h1 className="text-[13px] font-[400] text-gray-400  text-center  font-primary">
            To register NTN upload the following documents
          </h1>
          <div>
            <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
              <h3 className="text-xs font-main uppercase tracking-widest text-gray-400 font-[700]">
                CNIC Front side
              </h3>
              <input
                type="file"
                name="front"
                className="text-xs text-center text-gray-400 file:hidden"
                onChange={handleFile}
              />
            </label>
          </div>
          <div>
            <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
              <h3 className="text-xs font-main uppercase tracking-widest text-gray-400 font-[700]">
                CNIC Back side
              </h3>
              <input
                type="file"
                name="back"
                className="text-xs text-center text-gray-400 file:hidden"
                onChange={handleFile}
              />
            </label>
          </div>
          <button
            className="w-[300px] h-[50px] font-[700] text-sm bg-primary rounded-full text-white"
            onClick={handleUpload}
          >
            {loading ? (
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
              "Upload"
            )}
          </button>
          <Link
            to={`/user/${id}/ntn`}
            className="w-[300px] h-[50px] font-[700] flex items-center justify-center text-sm bg-primary rounded-full text-white"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NTNReg;
