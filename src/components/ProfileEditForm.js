import React, { useState, useEffect } from 'react';
import { FaUser, FaLock, FaEnvelope, FaIdCard, FaAccessibleIcon } from 'react-icons/fa';

const ProfileEditForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: '',
    realName: '',
    accessLevel: '',
    projectAccessLevel: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('registeredUsername') || '';
    const storedEmail = localStorage.getItem('registeredEmail') || '';
    const storedAccessLevel = localStorage.getItem('accessLevel') || '';
    const storedProjectAccess = localStorage.getItem('projectAccessLevel') || '';
    const storedRealName = localStorage.getItem('realName') || '';

    setFormData(prev => ({
      ...prev,
      username: storedUsername,
      email: storedEmail,
      accessLevel: storedAccessLevel,
      projectAccessLevel: storedProjectAccess,
      realName: storedRealName
    }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any existing error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    // Real Name validation
    if (!formData.realName.trim()) {
      newErrors.realName = 'Real name is required';
    }

    // Password validations (only if new password is entered)
    if (formData.newPassword) {
      if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      }

      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Perform update logic
    try {
      // Store updated information in localStorage
      localStorage.setItem('registeredUsername', formData.username);
      localStorage.setItem('registeredEmail', formData.email);
      localStorage.setItem('realName', formData.realName);
      localStorage.setItem('accessLevel', formData.accessLevel);
      localStorage.setItem('projectAccessLevel', formData.projectAccessLevel);

      // If new password is provided, update password
      if (formData.newPassword) {
        // Note: In a real application, you'd verify the current password 
        // and use a secure method to store/hash the new password
        localStorage.setItem('registeredPassword', formData.newPassword);
      }

      // Show success message
      setSuccessMessage('Profile updated successfully!');

      // Optional: Clear password fields after successful update
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));

      // Optional: Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (error) {
      console.error('Update failed', error);
      setErrors({ submit: 'Failed to update profile. Please try again.' });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <form 
          onSubmit={handleUpdateProfile}
          className="bg-white shadow-xl rounded-lg p-8 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Update Profile
          </h2>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              {successMessage}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaUser className="inline mr-2" /> Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <FaLock className="inline mr-2" /> Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.currentPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Current password"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <FaLock className="inline mr-2" /> New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md ${errors.newPassword ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="New password"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaLock className="inline mr-2" /> Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

    
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaEnvelope className="inline mr-2" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              <FaIdCard className="inline mr-2" /> Real Name
            </label>
            <input
              type="text"
              name="realName"
              value={formData.realName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md ${errors.realName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Enter real name"
            />
            {errors.realName && (
              <p className="text-red-500 text-xs mt-1">{errors.realName}</p>
            )}
          </div>

          {/* Access Levels */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <FaAccessibleIcon className="inline mr-2" /> Access Level
              </label>
              <select
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Access Level</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
                <option value="guest">Guest</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                <FaAccessibleIcon className="inline mr-2" /> Project Access Level
              </label>
              <select
                name="projectAccessLevel"
                value={formData.projectAccessLevel}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Project Access</option>
                <option value="full">Full Access</option>
                <option value="read">Read Only</option>
                <option value="write">Write Access</option>
                <option value="none">No Access</option>
              </select>
            </div>
          </div>

         
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Update Profile
            </button>
          </div>

          {/* Global Error Message */}
          {errors.submit && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              {errors.submit}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileEditForm;