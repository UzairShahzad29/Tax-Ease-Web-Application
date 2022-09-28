import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../AppContext";
import { MdClose } from "react-icons/md";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { openSideBar, toggleSideBar } = useGlobalContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`w-screen h-screen fixed top-0 left-0 md:w-[500px] transition-all duration-500 ease-in-out py-16 px-16 transform bg-primary ${
        openSideBar ? "translate-x-[0%]" : "translate-x-[-100%]"
      }`}
    >
      <div
        className="absolute text-white top-10 right-10 text-[40px] cursor-pointer"
        onClick={toggleSideBar}
      >
        <MdClose />
      </div>
      <div className="flex flex-col gap-7 py-28">
        <Link
          to={`/user/${user?._id}/services`}
          onClick={toggleSideBar}
          className="text-[25px] font-primary font-extrabold text-white tracking-wider"
        >
          Home
        </Link>
        <Link
          to={`/user/${user?._id}/ntn`}
          onClick={toggleSideBar}
          className="text-[25px] font-primary font-extrabold text-white tracking-wider"
        >
          NTN Registration
        </Link>
        <Link
          to={`/user/${user?._id}/tax-return`}
          onClick={toggleSideBar}
          className="text-[25px] capitalize font-primary font-extrabold text-white tracking-wider"
        >
          File tax return
        </Link>
        <Link
          to={`/user/${user?._id}/compliance`}
          onClick={toggleSideBar}
          className="text-[25px] capitalize font-primary font-extrabold text-white tracking-wider"
        >
          compliance audit
        </Link>
        <Link
          to="/"
          onClick={() => {
            toggleSideBar();
            localStorage.removeItem("user");
            navigate("/");
          }}
          className="text-[25px] capitalize font-primary font-extrabold text-white tracking-wider"
        >
          logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
