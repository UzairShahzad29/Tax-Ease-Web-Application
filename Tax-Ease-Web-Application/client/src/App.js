import { Routes, Route } from "react-router-dom";
import AOP from "./comps/AOP";
import Cart from "./comps/Cart";
import Compliance from "./comps/Compliance";
import Dasborad from "./comps/Admin/Dasborad";
import MainSec from "./comps/Admin/MainSec";
import Users from "./comps/Admin/Users";
import AOP_R from "./comps/Admin/AOP-R";
import axios from "axios";
import NT from "./comps/Admin/NTN";
import TAX from "./comps/Admin/TAX";
import SOLE from "./comps/Admin/SOLE";
import AOP_USER from "./comps/Admin/AOP_USER";
import NTN_USER from "./comps/Admin/NTN_USER";
import SOLE_USER from "./comps/Admin/SOLE_USER";
import TAX_USER from "./comps/Admin/TAX_USER";
import Lawyers from "./comps/Admin/Lawyers";
import NTN from "./comps/NTN";
import NTNReg from "./comps/NTN_Reg";
import Sidebar from "./comps/Sidebar";
import Sole from "./comps/Sole";
import Tax from "./comps/Tax";
import Main from "./pages/Main";
import Services from "./pages/Services";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import CompUSER from "./comps/Admin/Compliance_User";
import CompR from "./comps/Admin/Comp-R";
import Orders from "./comps/Orders";
import Auth from "./pages/Auth";

function App() {
  const [users, setUsers] = useState([]);
  const [ntn, setNtn] = useState([]);
  const [sole, setSole] = useState([]);
  const [aop, setAop] = useState([]);
  const [tax, setTax] = useState([]);
  const [lawyers, setLawyers] = useState([]);
  const [comp, setComp] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/user");
        setUsers(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNtnUsers = async () => {
      try {
        const res = await axios.get("/api/ntn/requests/");
        setNtn(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAopUsers = async () => {
      try {
        const res = await axios.get("/api/aop/requests/");
        setAop(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSoleUsers = async () => {
      try {
        const res = await axios.get("/api/sole/requests/");
        setSole(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTaxUsers = async () => {
      try {
        const res = await axios.get("/api/tax/requests/");
        setTax(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCompliance = async () => {
      try {
        const res = await axios.get("/api/comp/requests/");
        setComp(res.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLawyers = async () => {
      try {
        const res = await axios.get("/api/lawyers/");
        setLawyers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchNtnUsers();
    fetchAopUsers();
    fetchSoleUsers();
    fetchTaxUsers();
    fetchLawyers();
    fetchCompliance();
  }, [setUsers, setComp, setNtn, setAop, setSole, setTax, setLawyers]);

  return (
    <>
      <Routes>
        <Route element={<Auth />}>
          <Route path="/" element={<Signin />} />
          <Route path="/create-account" element={<Signup />} />
        </Route>
        <Route path="/user/:id" element={<Main />}>
          <Route path="services" element={<Services />} />
          <Route path="ntn" element={<NTN />} />
          <Route path="ntn-registration" element={<NTNReg />} />
          <Route path="aop-registration" element={<AOP />} />
          <Route path="sole-registration" element={<Sole />} />
          <Route path="tax-return" element={<Tax />} />
          <Route path="orders" element={<Orders />} />
          <Route path="cart" element={<Cart />} />
          <Route path="compliance" element={<Compliance />} />
        </Route>
        <Route path="tax-ease-admin" element={<Dasborad />}>
          <Route
            path="main"
            element={
              <MainSec
                ntn={ntn}
                aop={aop}
                tax={tax}
                users={users}
                sole={sole}
                lawyers={lawyers}
                comp={comp}
              />
            }
          />
          <Route path="users" element={<Users users={users} />} />
          <Route path="aop" element={<AOP_R aop={aop} />} />
          <Route path="ntn" element={<NT ntn={ntn} />} />
          <Route path="tax-return" element={<TAX tax={tax} />} />
          <Route path="sole" element={<SOLE sole={sole} />} />
          <Route path="comp" element={<CompR comp={comp} />} />
          <Route path="lawyers" element={<Lawyers lawyers={lawyers} />} />
        </Route>
        <Route path="/aop-user/:id" element={<AOP_USER />} />
        <Route path="/ntn-user/:id" element={<NTN_USER />} />
        <Route path="/sole-user/:id" element={<SOLE_USER />} />
        <Route path="/tax-user/:id" element={<TAX_USER />} />
        <Route path="/comp/:id" element={<CompUSER />} />
      </Routes>
      <Cart />
      <Sidebar />
    </>
  );
}

export default App;
