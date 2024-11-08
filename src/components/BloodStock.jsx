import React, { useContext } from 'react';
import DonationsContext from '../context/DonationsContext';
import { BiDroplet } from 'react-icons/bi';

const BloodStock = () => {
  const { donations } = useContext(DonationsContext);

  const bloodTypeQuantities = donations.reduce((acc, donation) => {
    if (!acc[donation.bloodType]) {
      acc[donation.bloodType] = { totalQuantity: 0, status: 'normal' };
    }
    acc[donation.bloodType].totalQuantity += parseInt(donation.quantityMl, 10);
    if (acc[donation.bloodType].totalQuantity < 5) {
      acc[donation.bloodType].status = 'low';
    } else if (acc[donation.bloodType].totalQuantity >= 5 && acc[donation.bloodType].totalQuantity <= 10) {
      acc[donation.bloodType].status = 'critical';
    } else {
      acc[donation.bloodType].status = 'normal';
    }
    return acc;
  }, {});

  const getStatusColor = (status) => {
    const statusColors = {
      low: 'bg-red-100 text-red-800',
      critical: 'bg-yellow-100 text-yellow-800',
      normal: 'bg-green-100 text-green-800'
    };
    return statusColors[status] || statusColors.normal;
  };

  const getTotalDonations = () => {
    return Object.values(bloodTypeQuantities).reduce((sum, { totalQuantity }) => sum + totalQuantity, 0);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3 mb-2">
          <BiDroplet className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-900">Blood Stock</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total blood volume: {getTotalDonations()}ml • {Object.keys(bloodTypeQuantities).length} blood types available
        </div>
      </div>

      {/* Table Section */}
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Blood Type</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Quantity</th>
                <th className="pb-4 text-left font-medium text-gray-600 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bloodTypeQuantities).map(([bloodType, { totalQuantity, status }]) => (
                <tr 
                  key={bloodType} 
                  className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <td className="py-4 pr-4">
                    <span className="font-medium text-gray-900">{bloodType}</span>
                  </td>
                  <td className="py-4 pr-4">
                    <span className="text-gray-700">{totalQuantity}ml</span>
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status}
                    </span>
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

export default BloodStock;