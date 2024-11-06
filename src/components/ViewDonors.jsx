import React, { useContext } from 'react';
import DonorContext from '../context/DonorContext';

const ViewDonors = () => {
  const { donor } = useContext(DonorContext);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">View Donors</h2>
        <p>All registered Donors</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-800 ">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Blood Type</th>
              {/* <th className="px-4 py-3 text-left">Date of Birth</th> */}
              <th className="px-4 py-3 text-left">Eligibility Status</th>
              <th className="px-4 py-3 text-left">Last Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {donor.map((donor) => (
              <tr key={donor._id} className="border-b text-sm border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                <td className="px-4 py-3 text-gray-800">{donor.name}</td>
                <td className="px-4 py-3 text-gray-800">{donor.contactInfo.email}</td>
                <td className="px-4 py-3 text-gray-800">{donor.contactInfo.phone}</td>
                <td className="px-4 py-3 text-gray-800">{donor.address}</td>
                <td className="px-4 py-3 text-gray-800">{donor.bloodType}</td>
                {/* <td className="px-4 py-3 text-gray-800">{donor.dateOfBirth ? donor.dateOfBirth.split('T')[0] : 'N/A'}</td> */}
                <td className="px-4 py-3 text-gray-800">{donor.eligibilityStatus ? 'Yes' : 'No'}</td>
                <td className="px-4 py-3 text-gray-800">{donor.lastDonationDate ? donor.lastDonationDate.split('T')[0] : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDonors;