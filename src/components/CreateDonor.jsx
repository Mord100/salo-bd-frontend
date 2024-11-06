import React, { useState, useContext } from "react";
import DonorContext from "../context/DonorContext";
import { toast } from "react-hot-toast";

const CreateDonor = () => {
  const { createDonor } = useContext(DonorContext);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    bloodType: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    address: "",
    lastDonationDate: "",
    eligibilityStatus: true,
  });
  const [loading, setLoading] = useState(false);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name.split(".")[1]]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      // Prepare the payload to be sent
      const payload = {
        name: formData.name,
        dateOfBirth: formData.dateOfBirth,
        bloodType: formData.bloodType,
        contactInfo: {
          phone: formData.contactInfo.phone,
          email: formData.contactInfo.email,
        },
        address: formData.address,
        lastDonationDate: formData.lastDonationDate,
        eligibilityStatus: formData.eligibilityStatus,
      };
      await createDonor(payload);
      toast.success("Donor registered successfully!"); 
      // Reset the form
      setFormData({
        name: "",
        dateOfBirth: "",
        bloodType: "",
        contactInfo: {
          phone: "",
          email: "",
        },
        address: "",
        lastDonationDate: "",
        eligibilityStatus: true,
      });
    } catch (error) {
      console.error("Error registering donor:", error);
      toast.error("Failed to register donor.");
    } finally {
      setLoading(false); 
    }
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div className="w-full px-20 mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
        Register New Donor
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Please fill out all required information to register a new donor
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="contactInfo.email"
              value={formData.contactInfo.email}
              onChange={handleContactInfoChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="contactInfo.phone"
              value={formData.contactInfo.phone}
              onChange={handleContactInfoChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter address"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Blood Type
            </label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Last Donation Date
            </label>
            <input
              type="date"
              name="lastDonationDate"
              value={formData.lastDonationDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Donor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonor;
