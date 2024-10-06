 
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateUserInfoAsync} from '../redux/personalInfoSlice'
import { Typography } from "@material-tailwind/react"; // Ensure you have this dependency
import PropTypes from "prop-types";

const EditPersonalInfoForm = ({ userInfo, onClose }) => {
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userid') || "", // Make sure to include userId
    firstName: userInfo?.firstName || "",
    middleName: userInfo?.middleName || "",
    lastName: userInfo?.lastName || "",
    phoneNumber: userInfo?.phoneNumber || "",
    email: userInfo?.email || "",
    password: "",
    address: userInfo?.address || "",
    city: userInfo?.city || "",
    state: userInfo?.state || "",
    zip: userInfo?.zip || "",
    selfDescription: userInfo?.selfDescription || "",
  });

  const { status, error } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    dispatch(updateUserInfoAsync(formData))
      .unwrap()
      .then(() => {
        console.log("Updated personal info:", formData);
        onClose();
      })
      .catch((err) => {
        console.error("Failed to update personal info:", err);
      });
  };


  return (
    <div className=" p-4 max-h-[600px]">
    <div className="flex justify-between items-center mb-4">
        <Typography variant="h4" className="font-semibold">Edit Personal Info</Typography>
        <button onClick={onClose} className="text-gray-500 text-3xl">×</button>
      </div>

      {/* Horizontal Line */}
      <hr className="border-gray-500 mb-4" />
      <div className="overflow-y-auto max-h-[500px]">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block font-medium">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Middle Name */}
          <div>
            <label htmlFor="middleName" className="block font-medium">
              Middle Name
            </label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block font-medium">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              placeholder="Enter new password (optional)"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block font-medium">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block font-medium">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block font-medium">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Zip */}
          <div>
            <label htmlFor="zip" className="block font-medium">
              Zip
            </label>
            <input
              type="text"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Summary */}
          <div className="col-span-2">
            <label htmlFor="summary" className="block font-medium">
              Summary
            </label>
            <textarea
              name="selfDescription"
              type="text"
              value={formData.selfDescription}
              onChange={handleChange}
              className="border p-3 w-full bg-gray-200 rounded-lg"
              required
            />
          </div>

          {/* Buttons */}


          
          <div className="col-span-2 flex justify-end space-x-4 mt-4">
            {/* <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-white bg-black "
            >
              Cancel
            </button> */}
           
            <button
              type="submit"
              className=" w-full text-[16px] font-thin px-4 py-2 border rounded-lg text-white bg-black hover:bg-gray-800"
            >
              Save Changes
            </button>
          </div>
        </form>

        {/* Error handling */}
        {status === "failed" && error && (
          <div className="text-red-500 mt-4">Error: {error}</div>
        )}
      </div>
    </div>
  );
};

// Add PropTypes for type checking
EditPersonalInfoForm.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditPersonalInfoForm;
