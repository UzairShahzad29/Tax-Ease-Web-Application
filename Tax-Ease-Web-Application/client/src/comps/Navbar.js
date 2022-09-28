import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdBorderColor } from "react-icons/md";
import { HiShoppingCart } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { useGlobalContext } from "../AppContext";
import { Link, useParams } from "react-router-dom";

const Navbar = () => {
  const { toggleSideBar, toggleCart } = useGlobalContext();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="w-full h-[10vh] bg-primary drop-shadow-md px-5 flex justify-between items-center">
      <Link to="/">
        <img
          src="/images/logo-n.png"
          alt="logo"
          className="w-[120px] h-[50px] object-contain"
        />
      </Link>
      <div className="flex items-center justify-center ">
        <button
          className=" bg-transparent text-white text-[24px]"
          onClick={toggleSideBar}
        >
          <GiHamburgerMenu />
        </button>
        <Link
          to={`/user/${id}/orders`}
          className=" mt-1 md:mt-0 absolute right-24   rounded-full flex items-center justify-center  bg-primary text-white text-[20px]"
        >
          <FaBell />
          <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full -mt-[20px]">
            <h6 className="text-[8px] text-gray-800">{user?.orders?.length}</h6>
          </div>
        </Link>
        <button
          className=" mt-1 md:mt-0 absolute right-16   rounded-full flex items-center justify-center  bg-primary text-white text-[20px]"
          onClick={toggleCart}
        >
          <HiShoppingCart />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
