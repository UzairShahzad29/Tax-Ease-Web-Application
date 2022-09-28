import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen">
      <div className="main-container">
        <div className="flex flex-col items-center justify-center h-full gap-10 py-28">
          <div>
            <img
              src="/images/logo-n.png"
              alt="logo"
              className="w-[150px] h-[70px] object-cover"
            />
          </div>
          <div className="w-[100px] h-[100px] rounded-full animate-pulse bg-primary"></div>
          <div className="w-[300px] h-[20px] bg-primary animate-pulse rounded-full"></div>
          <div className="w-[300px] h-[20px] bg-primary animate-pulse rounded-full"></div>
          <div className="w-[300px] h-[20px] bg-primary animate-pulse rounded-full"></div>
          <div className="w-[300px] h-[20px] bg-primary animate-pulse rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
