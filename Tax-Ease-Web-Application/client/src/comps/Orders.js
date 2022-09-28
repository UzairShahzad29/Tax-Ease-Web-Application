import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../AppContext";

const Orders = () => {
  const { getUser } = useGlobalContext();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser(id);
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, [getUser, id]);

  console.log("USER --------->", user);

  return (
    <div className="flex flex-col gap-3 px-10 py-10 mx-auto text-center max-w-7xl">
      <h1 className="text-[20px] font-[800]">My Orders</h1>
      {user?.orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2 px-3 py-3"
        >
          <h4>{order?.title}</h4>
          <p className="px-8 py-2 text-center bg-gray-300 rounded-full">
            {order?.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
