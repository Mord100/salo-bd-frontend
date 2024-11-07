import React, { useState, useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import DonationsContext from '../context/DonationsContext';

const CreateDonationModal = ({ show, onHide }) => {
  const { createDonation } = useContext(DonationsContext);
  const [formData, setFormData] = useState({
    donationDate: '',
    bloodType: '',
    quantityMl: '',
    donationCenter: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDonation(formData);
      console.log('Donation submitted:', formData);
      onHide(); // Close modal after successful submission
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (!show) return null; // Return null if show is false

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-screen w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create New Blood Donation</h2>
          <FaTimes
            className="text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={onHide}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="donationDate" className="block font-medium mb-2">
              Donation Date
            </label>
            <input
              type="date"
              id="donationDate"
              name="donationDate"
              value={formData.donationDate}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="bloodType" className="block font-medium mb-2">
              Blood Type
            </label>
            <select
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
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
          <div>
            <label htmlFor="quantityMl" className="block font-medium mb-2">
              Donation Quantity (ml)
            </label>
            <input
              type="number"
              id="quantityMl"
              name="quantityMl"
              value={formData.quantityMl}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              min={1}
              required
            />
          </div>
          <div>
            <label htmlFor="donationCenter" className="block font-medium mb-2">
              Donation Center
            </label>
            <input
              type="text"
              id="donationCenter"
              name="donationCenter"
              value={formData.donationCenter}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onHide}
              className="border border-gray-500 text-gray-900 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-900 hover:opacity-90 text-white font-semibold py-2 px-4 rounded"
            >
              Create Donation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationModal;