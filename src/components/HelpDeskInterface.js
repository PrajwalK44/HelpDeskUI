import React, { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import VerticalMenubar from "./VerticalMenubar";
import { useNavigate } from "react-router-dom";

const HelpDeskInterface = () => {
  const navigate=useNavigate();
  return (
    <>
      <div className="header bg-turquoise flex h-20">
        <div className="title text-white p-4 text-4xl font-semibold ml-4 italic cursor-pointer">
          HelpDesk
        </div>
        <div className="justify-center items-center ml-auto flex p-4">
          <div className=" p-2 text-sm font-semibold text-white bg-black border-2 border-black rounded-md cursor-pointer">
            BM
          </div>
          <div className="p-2 text-sm font-semibold  border-2 border-black rounded-md cursor-pointer">
            BI
          </div>
          <div className="p-4 text-xl cursor-pointer">
            <FaBell />
          </div>
          <div
            className="p-2 font-bold text-xl cursor-pointer"
            onClick={()=>navigate('/signin')}
          >
            <FaUser />
          </div>
          <div className="p-2 text-3xl cursor-pointer">
            <IoMdExit />
          </div>
        </div>
      </div>

      <VerticalMenubar />
    </>
  );
};

export default HelpDeskInterface;
