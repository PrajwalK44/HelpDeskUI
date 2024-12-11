import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { LuTicketPlus } from "react-icons/lu";
import { BsTicketFill } from "react-icons/bs";
import DashboardPage from "./DashboardPage";

const VerticalMenubar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const NewTicketComponent=()=><div>hello </div>
  const MyTicketComponent=()=><div>hello </div>

  const menuItems = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard />,
      component: <DashboardPage />,
    },
    {
      name: "New Ticket",
      icon: <LuTicketPlus />,
      component: <NewTicketComponent />,
    },
    {
      name: "My Ticket",
      icon: <BsTicketFill />,
      component: <MyTicketComponent />,
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray text-white flex flex-col p-4">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center p-3 cursor-pointer rounded-md transition-all duration-300 ${
              activeItem === item.name ? "bg-blue text-white" : "hover:bg-gray"
            } mb-2`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
            {activeItem === item.name && (
              <span className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col flex-grow h-screen">
        <div className="flex-grow  p-6 overflow-hidden">
          {menuItems.find((item) => item.name === activeItem)?.component}
        </div>

        <footer className="bg-turquoise w-full h-12 flex items-center justify-center">
          Footer area
        </footer>
      </div>
    </div>
  );
};

export default VerticalMenubar;
