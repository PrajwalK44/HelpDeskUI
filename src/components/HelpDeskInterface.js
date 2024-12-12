import React, { useState, useEffect } from "react";
import { FaBell, FaUser } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom";
import VerticalMenubar from "./VerticalMenubar";
import SignInModal from "./SignInModal";
import FullPageProfile from "./FullPageProfile";
import ProfileEditForm from "./ProfileEditForm";

const HelpDeskInterface = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isFullProfileOpen, setIsFullProfileOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("registeredUsername");
    const storedEmail = localStorage.getItem("registeredEmail");
    const storedPassword = localStorage.getItem("registeredPassword");

    if (storedUser && storedEmail && storedPassword) {
      setUserDetails({
        name: storedUser,
        email: storedEmail,
        department: storedPassword, // Assuming department is stored password for simplicity
      });
      setIsAuthenticated(true);
    }
  }, []);

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
  };

  const handleFullProfileClick = () => {
    setIsFullProfileOpen(true);
    setShowProfile(false);
  };

  const handleUpdateProfile = (updatedDetails) => {
    setUserDetails(updatedDetails);
    // Here you would typically also update the backend or localStorage
    localStorage.setItem("registeredUsername", updatedDetails.name);
    localStorage.setItem("registeredEmail", updatedDetails.email);
  };

  const handleSignOut = () => {
    localStorage.removeItem("registeredUsername");
    localStorage.removeItem("registeredEmail");
    localStorage.removeItem("registeredPassword");
    setIsAuthenticated(false);
    navigate("/signin");
  };
  const handleProfileEdit = () => {
    setIsProfileEditOpen(true);
    setShowProfile(false);
  };

  return (
    <>
      <div className="header bg-turquoise flex h-20">
        <div className="title text-white p-4 text-4xl font-semibold ml-4 italic cursor-pointer">
          HelpDesk
        </div>
        <div className="justify-center items-center ml-auto flex p-4">
          <div className="p-2 text-sm font-semibold text-white bg-black border-2 border-black rounded-md cursor-pointer">
            BM
          </div>
          <div className="p-2 text-sm font-semibold border-2 border-black rounded-md cursor-pointer">
            BI
          </div>
          <div className="p-4 text-xl cursor-pointer">
            <FaBell />
          </div>
          <div
            className="p-2 font-bold text-xl cursor-pointer relative"
            onClick={handleProfileToggle}
          >
            <FaUser />
            {showProfile && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2">
                {isAuthenticated ? (
                  <>
                    <p>
                      <strong>Name:</strong> {userDetails.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {userDetails.email}
                    </p>
                    <p>
                      <strong>Department:</strong> {userDetails.department}
                    </p>
                    <button
                      onClick={handleFullProfileClick}
                      className="w-full mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                      {" "}
                      View Full Profile
                    </button>
                    <button
                      onClick={handleProfileEdit}
                      className="w-full mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full mt-2 bg-red-500 text-white rounded-md px-4 py-2"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    className="w-full mt-2 bg-blue-500 text-white rounded-md px-4 py-2"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="p-2 text-3xl cursor-pointer">
            <IoMdExit />
          </div>
        </div>
      </div>

      <VerticalMenubar />

      {!isAuthenticated && <SignInModal />}

      {isFullProfileOpen && (
        <FullPageProfile
          userDetails={userDetails}
          onClose={() => setIsFullProfileOpen(false)}
          onUpdateProfile={handleUpdateProfile}
        />
      )}

      {isProfileEditOpen && (
        <ProfileEditForm onClose={() => setIsProfileEditOpen(false)} />
      )}
    </>
  );
};

export default HelpDeskInterface;
