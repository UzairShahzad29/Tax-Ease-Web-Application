import React, { useState } from "react";
import { useGlobalContext } from "../AppContext";
import Loader from "../comps/Loader";
import { Link } from "react-router-dom";
import Alert from "../comps/Alert";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const { loading, logIn, msg, showMsg } = useGlobalContext();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      showMsg(true, "danger", "All fields required!");
      return;
    }
    if (data.email === "taxease@services.com" && data.password === "taxease") {
      navigate(`/tax-ease-admin/main/`);
    } else {
      const res = await logIn({ email: data.email, password: data.password });

      if (res.success === false) {
        showMsg(true, "danger", res.message);
        return;
      }
      if (res.success === true) {
        localStorage.setItem("user", JSON.stringify(res.user));
        showMsg(true, "success", res.message);
        const timeout = setTimeout(() => {
          navigate(`/user/${res.user._id}/services`);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  };

  const [show, setShow] = useState(false);

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="w-full min-h-screen">
        <div className="main-container">
          <div className="flex flex-col items-center justify-center gap-4 py-14">
            {msg.show && <Alert {...msg} removeAlert={showMsg} />}
            <h1 className="text-3xl font-extrabold tracking-widest text-center uppercase text-primary font-primary sm:text-5xl ">
              Tax Ease
            </h1>
            <p className="text-[15px] font-main capitalize font-extraboldbold text-gray-400 tracking-wide -mt-4 text-center">
              sign in to your account to avail our services
            </p>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                Email Address <span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                placeholder="Email Address"
                className="input-section"
                name="email"
                onChange={handleInput}
                required
              />
            </label>
            <label className="flex flex-col relative">
              <p className="mb-2 ml-1 text-gray-500">
                Password <span className="text-red-600">*</span>
              </p>
              <input
                type={`${show ? "text" : "password"}`}
                placeholder="Password"
                name="password"
                onChange={handleInput}
                className="input-section selection:bg-transparent"
              />
              <FaEyeSlash
                className="absolute right-3 top-14 text-gray-500 cursor-pointer"
                onClick={() => setShow(!show)}
              />
              <h2 className="text-sm mt-3 self-end mb-3 text-left  text-gray-500 cursor-pointer">
                Forget Password?
              </h2>
            </label>
            <button
              onClick={handleSubmit}
              className="w-[300px] h-[60px] md:w-[500px] bg-primary rounded-full text-white font-secondary tracking-widest capitalize"
            >
              Get start
            </button>

            <div className="flex flex-col gap-5">
              <h1 className="text-primary font-[700] capitalize font-main text-center">
                don't have an account?
              </h1>
              <Link
                to="/create-account"
                className="font-main text-[15px] underline capitalize text-gray-400  tracking-wider text-center"
              >
                create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Signin;
