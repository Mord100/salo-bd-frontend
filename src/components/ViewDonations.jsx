import React, { useContext, useState } from 'react';
import DonationsContext from '../context/DonationsContext';
import CreateDonationModal from '../components/CreateDonationModal';

const ViewDonations = () => {
  const { donations } = useContext(DonationsContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6 flex justify-between w-full">
        <h2 className="text-2xl font-bold text-gray-800">View Donations</h2>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-gray-900 hover:opacity-90 text-white font-bold py-2 px-4 rounded-md"
        >
          New Record
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-800 ">
              <th className="px-4 py-3 text-left">Donation Date</th>
              <th className="px-4 py-3 text-left">Blood Type</th>
              <th className="px-4 py-3 text-left">Quantity (ml)</th>
              <th className="px-4 py-3 text-left">Donation Center</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-b text-sm border-gray-200 hover:bg-gray-50 transition-colors duration-300">
                <td className="px-4 py-3 text-gray-800">{donation.donationDate.split('T')[0]}</td>
                <td className="px-4 py-3 text-gray-800">{donation.bloodType}</td>
                <td className="px-4 py-3 text-gray-800">{donation.quantityMl}</td>
                <td className="px-4 py-3 text-gray-800">{donation.donationCenter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateDonationModal show={showModal} onHide={() => setShowModal(false)} />
    </div>
  );
};

export default ViewDonations;
