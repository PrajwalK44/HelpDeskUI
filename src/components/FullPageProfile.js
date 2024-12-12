import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";

const FullPageProfile = ({ userDetails, onClose, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDetails, setEditedDetails] = useState({ ...userDetails });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(editedDetails);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white shadow-xl rounded-lg p-8 relative">
          {/* Close Button */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
          >
            <FaTimes className="text-2xl" />
          </button>

          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-6xl text-blue-500">
              {userDetails.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isEditing ? (
                <input 
                  type="text"
                  name="name"
                  value={editedDetails.name}
                  onChange={handleInputChange}
                  className="w-full text-center border-b-2 border-blue-500"
                />
              ) : (
                userDetails.name
              )}
            </h1>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium">Email</label>
                  {isEditing ? (
                    <input 
                      type="email"
                      name="email"
                      value={editedDetails.email}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userDetails.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-600 font-medium">Department</label>
                  {isEditing ? (
                    <input 
                      type="text"
                      name="department"
                      value={editedDetails.department}
                      onChange={handleInputChange}
                      className="w-full border-b-2 border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-800">{userDetails.department}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Details Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 font-medium">Joined Date</label>
                  <p className="text-gray-800">January 15, 2024</p>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium">Role</label>
                  <p className="text-gray-800">Help Desk Support</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center space-x-4">
            {isEditing ? (
              <>
                <button 
                  onClick={handleSave}
                  className="bg-green-500 text-white px-6 py-2 rounded-md flex items-center hover:bg-green-600"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-md flex items-center hover:bg-blue-600"
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageProfile;