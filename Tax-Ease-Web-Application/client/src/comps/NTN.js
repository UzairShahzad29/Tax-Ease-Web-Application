import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const NTN = () => {
  const { id } = useParams();

  return (
    <div className="w-full py-16">
      <div className="main-container">
        <div className="flex flex-col justify-center items-center gap-5">
          <div className="py-10 px-4 bg-white rounded-lg drop-shadow-2xl w-[320px] h-auto">
            <Link
              to={`/user/${id}/ntn-registration`}
              className=" flex items-center justify-center flex-col gap-4"
            >
              <div>
                <img
                  src="/images/ntn.png"
                  alt="ntn"
                  className="w-[100px] h-[50px] object-contain"
                />
              </div>
              <h1 className="text-xl text-primary font-black font-secondary tracking-widest">
                NTN Registration
              </h1>
              <p className="-mt-3 font-[600] w-[80%] text-gray-500 capitalize text-center text-sm">
                register new indvidual and business NTN, add business to NTN.
              </p>
            </Link>
          </div>
          <div className="py-10 px-4 bg-white rounded-lg drop-shadow-2xl w-[320px] h-auto">
            <Link
              to={`/user/${id}/sole-registration`}
              className=" flex items-center justify-center flex-col gap-4"
            >
              <div>
                <img
                  src="/images/sole.png"
                  alt="ntn"
                  className="w-[130px] h-[90px] object-contain"
                />
              </div>
              <h1 className="text-xl text-center w-[90%] text-primary font-black font-secondary tracking-widest">
                Sole Proprieter Registration
              </h1>
              <p className="-mt-3 w-[80%] font-[600] text-gray-500 capitalize text-center text-sm">
                register sole proprieter in NTN
              </p>
            </Link>
          </div>
          <div className="py-10 px-4 bg-white rounded-lg drop-shadow-2xl w-[320px] h-auto">
            <Link
              to={`/user/${id}/aop-registration`}
              className=" flex items-center justify-center flex-col gap-4"
            >
              <div>
                <img
                  src="/images/aop.png"
                  alt="ntn"
                  className="w-[100px] h-[50px] object-contain"
                />
              </div>
              <h1 className="text-xl text-primary font-black font-secondary tracking-widest">
                AOP Registration
              </h1>
              <p className="-mt-3 w-[80%] font-[600] text-gray-500 capitalize text-center text-sm">
                register new indvidual and AOP NTN
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NTN;
