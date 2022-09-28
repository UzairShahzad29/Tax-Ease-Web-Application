import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const getCartItems = () => {
  const data = JSON.parse(localStorage.getItem("cartItems"));
  const cartData = data === null ? [] : data;
  return cartData;
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [openSideBar, setOpenSidebar] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openDSide, setOpenDSide] = useState(false);
  const [tab, setTab] = useState(1);
  const [msg, setMsg] = useState({
    show: false,
    type: "",
    text: "",
  });

  const [cart, setCart] = useState(getCartItems);

  const toggleSideBar = () => {
    setOpenSidebar(!openSideBar);
  };
  const toggleCart = () => {
    setOpenCart(!openCart);
  };
  const toggleDSide = () => {
    setOpenDSide(!openDSide);
  };

  const showMsg = (show = true, type = "", text = "") => {
    setMsg({ show, type, text });
  };

  const toggleTab = (number) => {
    setTab(number);
  };

  useEffect(() => {
    const cartData = JSON.stringify(cart);
    localStorage.setItem("cartItems", cartData);
  }, [cart]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  });

  const createUser = async (data) => {
    const { email, phone, password } = data;
    try {
      const res = await fetch("api/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, password }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return error;
    }
  };

  const logIn = async (data) => {
    const { email, password } = data;
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return error;
    }
  };
  const soleRegistration = async (data) => {
    try {
      const res = await fetch("/upload/sole", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return error;
    }
  };
  const aopRegistration = async (data) => {
    try {
      const res = await fetch("/upload/aop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      return result;
    } catch (error) {
      return error;
    }
  };

  const getUser = async (id) => {
    try {
      const res = await axios.get(`/api/user/${id}`);
      console.log("Res User -------> ", res.data.user);
      return res.data.user;
    } catch (error) {
      return error;
    }
  };

  const ntnRegistration = async (data) => {
    try {
      const res = await axios.post("/upload/ntn-data", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error) {
      return error;
    }
  };

  const addOrder = async (data, id) => {
    console.log("Order Data", data, id);
    try {
      const res = await axios.post(
        `/place-order/:${id}`,
        { data, id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data;
    } catch (error) {
      return error;
    }
  };

  const taxRegistration = async (data) => {
    console.log("TAX DATA ---->", data);
    try {
      const res = await fetch("/user/file-tax-return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log("Resp Tax ----> ", result);
      return result;
    } catch (error) {
      console.log("Error Tax ----> ", error);
      return error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        openSideBar,
        taxRegistration,
        toggleSideBar,
        getUser,
        setCart,
        aopRegistration,
        tab,
        openDSide,
        toggleDSide,
        cart,
        soleRegistration,
        openCart,
        toggleCart,
        toggleTab,
        msg,
        showMsg,
        createUser,
        logIn,
        ntnRegistration,
        addOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext };
