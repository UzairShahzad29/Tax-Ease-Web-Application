import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../AppContext";
import Alert from "../comps/Alert";
import { validateEmail } from ".././utilities";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { createUser, showMsg, msg } = useGlobalContext();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    phone: "",
    pass: "",
  });

  const handleData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.phone || !user.pass) {
      showMsg(true, "danger", "All Fields required");
      return;
    }
    if (validateEmail(user.email) === false) {
      showMsg(true, "danger", "Email must be valid");
      return;
    }
    if (user.phone.length !== 11) {
      showMsg(true, "danger", "Enter valid phone Number");
      return;
    }
    if (user.pass.length < 6) {
      showMsg(true, "danger", "Password should be strong");
      return;
    }

    const res = await createUser({
      email: user.email,
      phone: user.phone,
      password: user.pass,
    });
    if (res.success === true) {
      showMsg(true, "success", "user registered successfully");
      setUser({
        email: "",
        phone: "",
        pass: "",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (res.success === false) {
      showMsg(true, "info", res.message);
      return;
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center gap-5 py-28">
          {msg.show && <Alert {...msg} removeAlert={showMsg} />}
          <h1 className="text-primary font-[900] font-primary tracking-wider text-3xl sm:text-5xl text-center uppercase">
            create an account
          </h1>
          <label>
            <p className="mb-2 ml-1 text-gray-500">
              Email Address <span className="text-red-600">*</span>
            </p>
            <input
              type="email"
              placeholder="Email Address"
              className="input-section"
              name="email"
              onChange={handleData}
              required
            />
          </label>
          <label>
            <p className="mb-2 ml-1 text-gray-500">
              Phone Number <span className="text-red-600">*</span>
            </p>
            <input
              type="tel"
              placeholder="0300XXXXXXXXX"
              name="phone"
              className="input-section"
              onChange={handleData}
            />
          </label>
          <label>
            <p className="mb-2 ml-1 text-gray-500">
              Password <span className="text-red-600">*</span>
            </p>
            <input
              type="Password"
              placeholder="Password"
              name="pass"
              className="input-section"
              onChange={handleData}
            />
          </label>

          <button
            onClick={handleSubmit}
            className="w-[300px] h-[60px] md:w-[500px] bg-primary rounded-full text-white font-secondary tracking-widest capitalize"
          >
            create account
          </button>
          <div className="flex flex-col gap-5">
            <h1 className="text-primary font-[700] capitalize font-main text-center">
              already have an account?
            </h1>
            <Link
              to="/"
              className="font-main text-[15px] underline capitalize text-gray-400  tracking-wider text-center"
            >
              signin to your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
