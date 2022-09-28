import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../AppContext";
import { useParams, Link } from "react-router-dom";
import Alert from "./Alert";
import { convertBinary } from "../utilities";

const Sole = () => {
  const [next, setNext] = useState(false);
  const {
    getUser,
    msg,
    showMsg,
    cart,
    soleRegistration,
    setCart,
    toggleCart,
    addOrder,
  } = useGlobalContext();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(id);
      if (res) {
        setUser(res);
      }
    };
    fetchUser();
  }, [id, setUser, getUser]);

  const [input, setInput] = useState({
    business: "",
    email: "",
    phone: "",
  });

  const handleInput = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const [docs, setDocs] = useState({
    bill: null,
    lHead: null,
    rent: null,
    cnic: null,
  });

  const handleDocs = (e) => {
    setDocs({
      ...docs,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.business.length < 6) {
      showMsg(true, "danger", "Business name must be valid");
      return;
    }
    if (!docs.bill || !docs.lHead || !docs.cnic || !docs.rent) {
      showMsg(true, "danger", "Upload all document");
      return;
    }
    const filesData = [];
    const files = Object.values(docs);
    const oId = Math.floor(Math.random() * 10000000);
    for (const file of files) {
      const result = await convertBinary(file);
      filesData.push(result);
      if (filesData.length === 4) {
        const res = await soleRegistration({
          id: user._id,
          business: input.business,
          email: input.email === "" ? user.email : input.email,
          phone: input.phone === "" ? user.phone : input.phone,
          filesData,
          oId,
        });
        if (res.success === true) {
          showMsg(true, "success", res.message);
          addOrder(
            {
              oId,
              title: "Sole Registration",
              status: "pending",
            },
            id
          );
          setCart([
            ...cart,
            {
              id: Math.floor(Math.random() * 10000),
              title: "Sole Ntn Registration charges",
              price: 5000,
            },
          ]);
          const timeout = setTimeout(() => {
            toggleCart();
            setDocs({
              bill: null,
              lHead: null,
              rent: null,
              cnic: null,
            });
          }, 2000);
          return () => clearTimeout(timeout);
        }
      }
    }
  };

  return (
    <div className="w-full py-10">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center gap-5">
          {msg.show && <Alert {...msg} removeAlert={showMsg} />}
          <h1 className="text-xl font-[800] font-main tracking-wider uppercase text-primary mb-6">
            Sole Regsitration
          </h1>
          <input
            className="input-section"
            type="text"
            placeholder="Business Name"
            name="business"
            onChange={handleInput}
          />
          <input
            className="input-section"
            type="email"
            placeholder="Email Address"
            value={user !== null ? user.email : input.email}
            name="email"
            onChange={handleInput}
          />
          <input
            className="input-section"
            type="text"
            placeholder="0300XXXXXXXX"
            value={user !== null ? user.phone : input.phone}
            name="phone"
            onChange={handleInput}
          />
          {next === false ? (
            <button
              className="bg-primary text-white font-bold px-3 py-3 w-[150px] rounded-md"
              onClick={() => setNext(true)}
            >
              Next
            </button>
          ) : null}
          {next && (
            <>
              <div className="flex flex-col items-center justify-center gap-5 mt-10">
                <h4 className="text-lg text-gray-400 ">
                  Upload following documnets
                </h4>

                <div>
                  <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
                    <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                      colored cnic copies of all partners
                    </h3>
                    <input
                      type="file"
                      name="cnic"
                      className="text-xs text-center text-gray-400 file:hidden"
                      onChange={handleDocs}
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
                    <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                      letter head copy
                    </h3>
                    <input
                      type="file"
                      name="lHead"
                      className="text-xs text-center text-gray-400 file:hidden"
                      onChange={handleDocs}
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
                    <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                      rent agreement copy
                    </h3>
                    <input
                      type="file"
                      name="rent"
                      className="text-xs text-center text-gray-400 file:hidden"
                      onChange={handleDocs}
                    />
                  </label>
                </div>
                <div>
                  <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
                    <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                      paid utility bill copy
                    </h3>
                    <input
                      type="file"
                      name="bill"
                      className="text-xs text-center text-gray-400 file:hidden"
                      onChange={handleDocs}
                    />
                  </label>
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-[300px] mt-6 h-[60px] bg-primary text-white tracking-wider font-main font-bold rounded-full"
                >
                  Submit Application
                </button>
                <Link
                  to={`/user/${id}/ntn`}
                  className="w-[300px] h-[50px] font-[700] flex items-center justify-center text-sm bg-primary rounded-full text-white"
                >
                  Back
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sole;
