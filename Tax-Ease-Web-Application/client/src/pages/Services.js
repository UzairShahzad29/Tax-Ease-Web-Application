import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useParams } from "react-router-dom";

const Services = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-screen">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center h-full gap-5 py-10">
          <h1 className="text-[30px] font-secondary tracking-[5px] text-primary uppercase font-black mb-10">
            Services
          </h1>
          <div className="service">
            <div>
              <img
                src="/images/return.png"
                alt="ntn"
                className="w-[100px] h-[100px]"
              />
            </div>
            <h1 className="text-xl font-extrabold text-primary font-main">
              File Tax Return
            </h1>
            <p className="-mt-3 text-center text-gray-400 capitalize font-main">
              file your tax return easily and with few steps.
            </p>
            <Link
              to={`/user/${id}/tax-return`}
              className="flex items-center justify-between gap-4 font-bold text-center capitalize text-primary font-main "
            >
              get service{" "}
              <span className="text-[30px]">
                <IoIosArrowRoundForward />
              </span>
            </Link>
          </div>
          <div className="service">
            <div>
              <img
                src="/images/NTN-Services.png"
                alt="ntn"
                className="w-[100px] h-[100px]"
              />
            </div>
            <h1 className="text-xl font-extrabold text-primary font-main">
              NTN Registration
            </h1>
            <p className="-mt-3 text-center text-gray-400 capitalize font-main">
              register new indvidual and business NTN, add business to NTN.
            </p>
            <Link
              to={`/user/${id}/ntn`}
              className="flex items-center justify-between gap-4 font-bold text-center capitalize text-primary font-main "
            >
              get service{" "}
              <span className="text-[30px]">
                <IoIosArrowRoundForward />
              </span>
            </Link>
          </div>
          <div className="service">
            <div>
              <img
                src="/images/comp.png"
                alt="ntn"
                className="w-[250px] h-[100px] object-scale-down"
              />
            </div>
            <h1 className="text-xl font-extrabold text-primary font-main">
              FBR Compliance Notice
            </h1>
            <p className="-mt-3 text-center text-gray-400 capitalize font-main">
              upload compliance audit notice and get a solution
            </p>
            <Link
              to={`/user/${id}/compliance`}
              className="flex items-center justify-between gap-4 font-bold text-center capitalize text-primary font-main "
            >
              get service{" "}
              <span className="text-[30px]">
                <IoIosArrowRoundForward />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
