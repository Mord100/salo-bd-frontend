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
      onHide();
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm overflow-y-auto h-screen w-full flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8 m-4 transform transition-all duration-300 ease-out">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">New Blood Donation</h2>
          <button
            onClick={onHide}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <FaTimes className="text-gray-500 hover:text-gray-700 w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="donationDate" className="block text-sm font-medium text-gray-700 mb-2">
                Donation Date
              </label>
              <input
                type="date"
                id="donationDate"
                name="donationDate"
                value={formData.donationDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700 mb-2">
                Blood Type
              </label>
              <select
                id="bloodType"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 bg-white"
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
              <label htmlFor="quantityMl" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (ml)
              </label>
              <input
                type="number"
                id="quantityMl"
                name="quantityMl"
                value={formData.quantityMl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                min={1}
                required
              />
            </div>
            
            <div>
              <label htmlFor="donationCenter" className="block text-sm font-medium text-gray-700 mb-2">
                Donation Center
              </label>
              <input
                type="text"
                id="donationCenter"
                name="donationCenter"
                value={formData.donationCenter}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onHide}
              className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
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