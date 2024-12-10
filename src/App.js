import React from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const HelpDeskInterface = () => {
  return (
    <>
      <div className="header bg-turquoise flex h-20">
        <div className="title text-white p-4 text-4xl font-semibold ml-4 italic ">
          HelpDesk
        </div>
        <div className="justify-center items-center ml-auto flex p-4">
          <div className=" p-2 text-sm font-semibold text-white bg-black border-2 border-black rounded-md">
            BM
          </div>
          <div className="p-2 text-sm font-semibold  border-2 border-black rounded-md">
            BI
          </div>
          <div className="p-4 text-xl">
            <FaBell />
          </div>
          <div className="p-2 font-bold text-xl">
            <FaUser/>
          </div>
          <div className="p-2 text-3xl">
            <IoMdExit />
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpDeskInterface;
