import React, { useContext, useState } from 'react';
import DonationsContext from '../context/DonationsContext';
import CreateDonationModal from '../components/CreateDonationModal';
import { BiDonateBlood, BiPlus } from 'react-icons/bi';

const ViewDonations = () => {
  const { donations } = useContext(DonationsContext);
  const [showModal, setShowModal] = useState(false);

  const getTotalDonations = () => {
    return donations.reduce((sum, donation) => sum + parseInt(donation.quantityMl, 10), 0);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-2">
              <BiDonateBlood className="w-6 h-6 text-blue-800" />
              <h2 className="text-2xl font-semibold text-gray-900">View Donations</h2>
            </div>
            <div className="text-sm text-gray-500">
              Total donations: {donations.length} • Total volume: {getTotalDonations()}ml
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200 space-x-2"
          >
            <BiPlus className="w-5 h-5" />
            <span>New Record</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Donation Date</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Blood Type</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Quantity</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Donation Center</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr 
                  key={donation._id} 
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="py-4 pr-4">
                    <span className="font-medium text-gray-900">
                      {donation.donationDate.split('T')[0]}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {donation.bloodType}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-gray-700">{donation.quantityMl}ml</span>
                  </td>
                  <td className="py-4">
                    <span className="text-gray-700">{donation.donationCenter}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <CreateDonationModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default ViewDonations;