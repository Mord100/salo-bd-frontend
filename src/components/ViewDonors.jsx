import React, { useContext } from 'react';
import DonorContext from '../context/DonorContext';
import { BiGroup } from 'react-icons/bi';

const ViewDonors = () => {
  const { donor } = useContext(DonorContext);

  const getEligibilityStatus = (status) => {
    return status ? (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Eligible
      </span>
    ) : (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Not Eligible
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-2">
          <BiGroup className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-900">View Donors</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total registered donors: {donor.length} • Managing blood donation records
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Name</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Email</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Phone</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Address</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Blood Type</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Eligibility</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Last Donation</th>
              </tr>
            </thead>
            <tbody>
              {donor.map((donor) => (
                <tr 
                  key={donor._id} 
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="py-4 pr-4">
                    <span className="font-medium text-gray-900">{donor.name}</span>
                  </td>
                  <td className="py-4 pr-4 text-gray-700">{donor.contactInfo.email}</td>
                  <td className="py-4 pr-4 text-gray-700">{donor.contactInfo.phone}</td>
                  <td className="py-4 pr-4 text-gray-700">{donor.address}</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {donor.bloodType}
                    </span>
                  </td>
                  <td className="py-4 pr-4">
                    {getEligibilityStatus(donor.eligibilityStatus)}
                  </td>
                  <td className="py-4 text-gray-700">
                    {donor.lastDonationDate ? donor.lastDonationDate.split('T')[0] : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDonors;