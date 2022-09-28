import React, { useState } from "react";
import { useGlobalContext } from "../AppContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import Alert from "./Alert";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { convertBinary, validateEmail } from "../utilities";
import { Audio } from "react-loader-spinner";
import { FaEyeSlash } from "react-icons/fa";

const animatedComponents = makeAnimated();
const docs = [];
const taxFiles = [];
const incomeoptions = [
  { value: "salary", label: "salary" },
  { value: "business", label: "business" },
  { value: "property", label: "property" },
  { value: "capital gain", label: "capital gain" },
];

const Tax = () => {
  const {
    tab,
    toggleTab,
    msg,
    showMsg,
    cart,
    toggleCart,
    setCart,
    taxRegistration,
    addOrder,
  } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isNtn, setNtn] = useState(true);

  const [cred, setCred] = useState({
    number: "",
    name: "",
    pass: "",
    pin: "",
  });

  const [personal, setPersonal] = useState({
    name: "",
    email: "",
    phone: "",
    cnic: "",
    occup: "",
    nat: "",
    resi: "",
  });

  const [b_type, setB_type] = useState("");

  const handleBusinessType = (e) => {
    setB_type(e);
  };

  const inputCred = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };

  const handleCred = (e) => {
    e.preventDefault();
    if (!cred.name || !cred.number || !cred.pass || !cred.pin) {
      showMsg(true, "danger", "All Fields Required! NTN");
      return;
    }
    if (cred.number.length !== 13) {
      showMsg(true, "danger", "Inavlid Ntn Number");
      return;
    }
    if (cred.pin.length !== 4) {
      showMsg(true, "danger", "Inavlid Ntn Pin");
      return;
    }

    toggleTab(2);
  };

  const inputPersonal = (e) => {
    e.preventDefault();
    setPersonal({
      ...personal,
      [e.target.name]: e.target.value,
    });
  };

  const handlePersonal = (e) => {
    e.preventDefault();

    if (
      !personal.name ||
      !personal.email ||
      !personal.cnic ||
      !personal.phone ||
      !personal.resi ||
      !personal.nat ||
      !personal.occup
    ) {
      showMsg(true, "danger", "All Fields are Required! Personal");
      return;
    }

    if (personal.name.length < 5) {
      showMsg(true, "danger", "Name must be Valid");
      return;
    }

    if (validateEmail(personal.email) === false) {
      showMsg(true, "danger", "Email must be Valid");
      return;
    }
    if (personal.cnic.length !== 13) {
      showMsg(true, "danger", "Cnic must be Valid");
      return;
    }

    if (personal.phone.length < 11) {
      showMsg(true, "danger", "Phone must be Valid");
      return;
    }

    toggleTab(3);
  };

  const [income, setIncome] = useState(null);
  const [bank, setBank] = useState(null);
  const [files, setFiles] = useState([]);
  const [st, setSt] = useState(null); //final

  const changeIncomeSource = (value) => {
    setIncome(value.map((v) => v.value));
  };

  const handleFiles = (e) => {
    setFiles([...files, { source: e.target.name, doc: e.target.files[0] }]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    for (const file of files) {
      const result = await convertBinary(file.doc);
      docs.push(result);
    }

    const bk = await convertBinary(bank);
    setSt(bk);

    showMsg(true, "success", "Documents uploaded successfully");
  };

  const handleIncomeSource = () => {
    if (income === null) {
      showMsg(true, "danger", "Select income source");
      return;
    }
    if (bank.length === 0) {
      showMsg(true, "danger", "upload bank statement");
      return;
    }
    toggleTab(4);
  };

  const [taxSource, setTaxSource] = useState([]);

  const handleTaxChk = (e) => {
    setTaxSource([...taxSource, e.target.value]);
  };

  const handleTaxeSource = () => {
    if (taxSource.length === 0) {
      showMsg(true, "danger", "Choose tax deduction source");
      return;
    }
    toggleTab(5);
  };

  const [taxDocs, setTaxDocs] = useState([]);

  const handleTaxDocs = (e) => {
    setTaxDocs([...taxDocs, e.target.files[0]]);
  };

  const taxDeductionDocs = async () => {
    for (const file of taxDocs) {
      const result = await convertBinary(file);
      taxFiles.push(result);
    }
    showMsg(true, "success", "Documents uploaded successfully");
  };

  const handleFinal = () => {
    if (taxDocs.length === 0) {
      showMsg(true, "danger", "Upload all docs");
      return;
    }

    toggleTab(6);
  };

  const [wealth, setWealth] = useState({
    cash: "",
    jewllery: "",
    vihecle: "",
    property: "",
  });
  const handleWealth = (e) => {
    setWealth({
      ...wealth,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (docs.length !== 0 && taxFiles.length !== 0) {
      const oId = Math.floor(Math.random() * 1000000);
      const data = {
        id,
        name: personal.name,
        email: personal.email,
        phone: personal.phone,
        cnic: personal.cnic,
        nationality: personal.nat,
        residence: personal.resi,
        occupation: personal.occup,
        ntnNumber: cred.number,
        ntnUsername: cred.name,
        ntnPin: cred.pin,
        ntnPassword: cred.pass,
        incomeType: income,
        docs,
        businessType: b_type,
        annual,
        taxesData: taxSource,
        taxDOcs: taxFiles,
        bankState: st,
        amount: wealth.cash,
        jewllery: wealth.jewllery,
        vehicles: wealth.vihecle,
        property: wealth.property,
        loan,
        oId,
      };
      const result = await taxRegistration(data);
      if (result.success === true) {
        setLoading(false);
        showMsg(true, "success", result.message);
        addOrder(
          {
            oId,
            title: "Tax regstration",
            status: "pending",
          },
          id
        );
        setCart([
          ...cart,
          {
            oId,
            title: "Tax return file charges",
            price: 10000,
          },
        ]);
        const timeout = setTimeout(() => {
          toggleCart();
          navigate(`/user/${id}/services`);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  };

  const [show, setShow] = useState(false);
  const [annual, setAnnual] = useState("");
  const [loan, setLoan] = useState("");

  return (
    <div className="w-full py-5">
      <div className="main-container">
        {msg.show && <Alert {...msg} removeAlert={showMsg} />}
        <div
          className={`${
            isNtn === true
              ? "flex flex-col items-center justify-center gap-10"
              : "hidden"
          }`}
        >
          <div>
            <img
              src="/images/NTN-Services.png"
              alt="ntn"
              className="w-[300px] h-[150px] object-contain"
            />
          </div>
          <h1 className="text-primary -mt-5 text-[17px] tracking-wider text-center font-secondary">
            Are You Registered in NTN?
          </h1>
          <div className="flex items-center justify-between gap-7">
            <button
              className="bg-primary text-white w-[110px] h-[40px] rounded-full"
              onClick={() => setNtn(false)}
            >
              Yes
            </button>
            <button
              className="bg-primary text-white w-[110px] h-[40px] rounded-full"
              onClick={() => {
                navigate(`/user/${id}/ntn`);
              }}
            >
              No
            </button>
          </div>
        </div>
        <div
          className={`${
            isNtn === false
              ? "flex flex-col items-center justify-center gap-5"
              : "hidden"
          }`}
        >
          <div
            className={`${
              tab === 1
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900] ">
              NTN Credentials
            </h1>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                NTN Number <span className="text-red-600">*</span>
              </p>
              <input
                tyep="text"
                placeholder="NTN Number"
                name="number"
                className="input-section"
                onChange={inputCred}
              />
            </label>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                NTN Username <span className="text-red-600">*</span>
              </p>
              <input
                tyep="text"
                placeholder="NTN Username"
                name="name"
                className="input-section"
                onChange={inputCred}
              />
            </label>
            <label className="relative">
              <p className="mb-2 ml-1 text-gray-500">
                NTN Password <span className="text-red-600">*</span>
              </p>
              <input
                type={`${show ? "text" : "password"}`}
                placeholder="NTN Password"
                name="pass"
                className="input-section selection:bg-transparent"
                onChange={inputCred}
              />
              <FaEyeSlash
                className="absolute right-3 cursor-pointer top-[53px]"
                onClick={() => setShow(!show)}
              />
            </label>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                NTN Pin <span className="text-red-600">*</span>
              </p>
              <input
                tyep="text"
                placeholder="NTN Pin"
                name="pin"
                className="input-section"
                onChange={inputCred}
              />
            </label>

            <div className="flex items-center justify-between mt-7 gap-7">
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={() => {
                  navigate(`/user/${id}/ntn`);
                }}
              >
                Back
              </button>
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={handleCred}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className={`${
              tab === 2
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900] ">
              Personal Information
            </h1>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                Name <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input-section"
                onChange={inputPersonal}
              />
            </label>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                Email <span className="text-red-600">*</span>
              </p>
              <input
                type="email"
                placeholder="Email"
                name="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                className="input-section"
                onChange={inputPersonal}
              />
            </label>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                Phone Number <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                className="input-section"
                onChange={inputPersonal}
              />
            </label>
            <label>
              <p className="mb-2 ml-1 text-gray-500">
                CNIC <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="CNIC Number"
                name="cnic"
                className="input-section"
                onChange={inputPersonal}
              />
            </label>

            <select
              className="input-section"
              name="nat"
              onChange={inputPersonal}
            >
              <option>Nationality</option>
              <option>Pakistan</option>
              <option>Foreigner</option>
            </select>
            <select
              className="input-section"
              name="resi"
              onChange={inputPersonal}
            >
              <option>Select Residence</option>
              <option>Residence</option>
              <option>Non-Residence</option>
            </select>
            <select
              className="input-section"
              name="occup"
              onChange={inputPersonal}
            >
              <option>Select Occupation</option>
              <option>Corporate Sector</option>
              <option>Fedral Govt</option>
              <option>Provisional Govt</option>
              <option>other</option>
            </select>
            <div className="flex items-center justify-between mt-7 gap-7">
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={() => {
                  toggleTab(1);
                }}
              >
                Back
              </button>
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={handlePersonal}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className={`${
              tab === 3
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900]">
              Select source of income
            </h1>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={incomeoptions}
              className="multi-select w-[300px] h-[60px]"
              onChange={changeIncomeSource}
            />
            <div>
              {income !== null ? (
                <div className="flex flex-col items-center justify-center gap-5 mt-7">
                  <h1 className="text-xs text-gray-400 font-[600] tracking-wider text-center">
                    Upload following documents
                  </h1>
                  <div className="flex flex-col items-center justify-center gap-5">
                    {income.map((i, index) => {
                      if (i === "business") {
                        return (
                          <div key={index}>
                            <h3 className="mb-3 text-sm text-center text-gray-500">
                              Select Business Type
                            </h3>
                            <select
                              className="w-[300px] px-3 py-1"
                              onChange={(e) =>
                                handleBusinessType(e.target.value)
                              }
                            >
                              <option>Retailer</option>
                              <option>WholeSeller</option>
                              <option>Manufacturer</option>
                            </select>
                            <div>
                              {b_type && (
                                <input
                                  onChange={(e) => setAnnual(e.target.value)}
                                  className="w-[300px] pl-2 h-[30px] mt-3 border border-gray-300 rounded-md"
                                  placeholder="Total Net Annual Income"
                                />
                              )}
                            </div>
                          </div>
                        );
                      }
                      return (
                        <label
                          className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm "
                          key={index}
                        >
                          <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                            {i} documnet
                          </h3>
                          <input
                            type="file"
                            name={i}
                            className="text-xs text-center text-gray-400 file:hidden"
                            onChange={handleFiles}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <div>
                    {income !== null ? (
                      <div>
                        <label className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm ">
                          <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                            Bank Statement copy
                          </h3>
                          <input
                            type="file"
                            name="bank"
                            className="text-xs text-center text-gray-400 file:hidden"
                            onChange={(e) => setBank(e.target.files[0])}
                          />
                        </label>
                        <div>
                          <button
                            className="w-[300px] h-[60px] rounded-full font-[600]  bg-primary text-white text-sm mt-10"
                            onClick={handleUpload}
                          >
                            Upload Documnets
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-between mt-7 gap-7">
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={() => {
                  toggleTab(2);
                }}
              >
                Back
              </button>
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={handleIncomeSource}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className={`${
              tab === 4
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900]">
              choose tax deduction source
            </h1>
            <p className="-mt-6 text-sm tracking-wider text-left text-gray-400">
              you might pay at the time of transaction
            </p>
            <div className="flex items-center self-start justify-center gap-3 accent-primary">
              <input
                type="checkbox"
                name="taxes"
                id="chk"
                value="Utility Bills"
                onChange={handleTaxChk}
              />
              <label
                htmlFor="chk"
                className="text-sm tracking-wider text-left text-gray-400"
              >
                Utility Bills
              </label>
            </div>
            <div className="flex items-center self-start justify-center gap-3 -mt-3 accent-primary">
              <input
                type="checkbox"
                name="taxes"
                id="chk2"
                value="On Vehicles"
                onChange={handleTaxChk}
              />
              <label
                htmlFor="chk2"
                className="text-sm tracking-wider text-left text-gray-400"
              >
                On Vehicles
              </label>
            </div>
            <div className="flex items-center self-start justify-center gap-3 -mt-3 accent-primary">
              <input
                type="checkbox"
                name="taxes"
                id="chk3"
                value="Others"
                onChange={handleTaxChk}
              />
              <label
                htmlFor="chk3"
                className="text-sm tracking-wider text-left text-gray-400"
              >
                Others
              </label>
            </div>
            <div className="flex items-center justify-between mt-7 gap-7">
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={() => {
                  toggleTab(3);
                }}
              >
                Back
              </button>
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={handleTaxeSource}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className={`${
              tab === 5
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900]">
              Upload Tax deduction documents
            </h1>
            <div className="flex flex-col items-center justify-center gap-7">
              {taxSource.map((tax, index) => (
                <label
                  key={index}
                  className="flex flex-col items-center justify-center gap-4 border border-primary  w-[300px] h-[100px] bg-white drop-shadow-md rounded-sm "
                >
                  <h3 className="text-xs font-main uppercase tracking-widest text-primary font-[700]">
                    {tax} deduction copy
                  </h3>
                  <input
                    type="file"
                    className="text-xs text-center text-gray-400 file:hidden"
                    onChange={handleTaxDocs}
                  />
                </label>
              ))}
              {taxDocs.length !== 0 ? (
                <button
                  onClick={taxDeductionDocs}
                  className="w-[300px] h-[60px] rounded-full font-[600]  bg-primary text-white text-sm mt-10"
                >
                  Upload
                </button>
              ) : null}
            </div>
            <div className="flex items-center justify-between mt-7 gap-7">
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={() => {
                  toggleTab(4);
                }}
              >
                Back
              </button>
              <button
                className="bg-primary text-white w-[110px] h-[40px] rounded-full"
                onClick={handleFinal}
              >
                Next
              </button>
            </div>
          </div>
          <div
            className={`${
              tab === 6
                ? "flex flex-col items-center justify-center gap-5"
                : "hidden"
            }`}
          >
            <h1 className="text-[20px] mb-7 self-start text-primary font-secondary tracking-widest font-[900] ">
              wealth statement
            </h1>
            {Object.keys(wealth).map((w, index) => (
              <input
                type="number"
                name={w}
                placeholder={`${w} amount`}
                onChange={handleWealth}
                className="input-section"
                key={index}
              />
            ))}
            <div className="mt-5 mb-3">
              <h1 className="mb-2 text-gray-700">
                Liabilities{" "}
                <span className="text-[10px] text-gray-300">{`(Optional)`}</span>
              </h1>
              <input
                className="input-section"
                placeholder="Acquire any loan (optional)"
                onChange={(e) => setLoan(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-[300px] h-[60px] rounded-full font-[600]  bg-primary text-white text-sm mt-10"
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
                "Submit"
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
    </div>
  );
};

export default Tax;
