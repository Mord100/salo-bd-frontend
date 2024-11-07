import React, { useState, useContext } from 'react';
import { 
  RiDashboardLine, 
  RiUserHeartLine,
  RiCalendarEventLine,
  RiDropLine,
  RiHospitalLine,
} from 'react-icons/ri';
import { FaDroplet } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";
import UserContext from '../context/UserContext';
import ViewDonors from '../components/ViewDonors';
import ViewDonations from '../components/ViewDonations';
import BloodStock from '../components/BloodStock';

const MenuItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center px-4 py-3 text-md ${
      active ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' : 'text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Icon className="w-6 h-6 mr-3" />
    <span>{label}</span>
  </button>
);

const StatCard = ({ icon: Icon, label, value }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-100">
    <div className="flex items-center mb-3">
      <div className="p-2 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-700" />
      </div>
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{value}</h3>
    <p className="text-md text-gray-500">{label}</p>
  </div>
);

const BloodTypeCard = ({ type, level, status }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <RiDropLine className={`w-7 h-7 mr-2 ${
          status === 'critical' ? 'text-blue-700' : 
          status === 'low' ? 'text-yellow-500' : 'text-green-500'
        }`} />
        <div>
          <h4 className="font-semibold text-gray-900">{type}</h4>
          <p className="text-md text-gray-500">{level} units</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs ${
        status === 'critical' ? 'bg-blue-100 text-blue-700' : 
        status === 'low' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
      }`}>
        {status}
      </span>
    </div>
  </div>
);

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const { logout } = useContext(UserContext);
  const [viewDonors, setViewDonors] = useState(false);
  const [viewDonations, setViewDonations] = useState(false);
  const [viewBloodStock, setViewBloodStock] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleMenuItemClick = (item) => {
    setActiveItem(item.label);
    setViewDonors(item.label === 'Donors');
    setViewDonations(item.label === 'Donations');
    setViewBloodStock(item.label === 'Blood Stock');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white h-full border-r border-gray-100`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className={`flex items-center ${!isSidebarOpen && 'hidden'}`}>
            <FaDroplet className="w-7 h-7 text-gray-900 mr-2" />
            <h1 className="font-semibold text-lg">BDMS-Admin</h1>
          </div>
        </div>

        <nav className="mt-6">
          {[
            { icon: RiDashboardLine, label: 'Dashboard' },
            { icon: RiUserHeartLine, label: 'Donors' },
            { icon: RiCalendarEventLine, label: 'Donations' },
            { icon: RiDropLine, label: 'Blood Stock' },
          ].map((item) => (
            <MenuItem
              key={item.label}
              {...item}
              active={activeItem === item.label}
              onClick={() => handleMenuItemClick(item)}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-end px-6 py-4">
            <button 
              onClick={handleLogout}
              className="flex items-center text-gray-800 hover:underline hover:text-gray-900"
            >
              <BiLogOut className="w-6 h-6 mr-2" />
              <span className="text-md">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {viewDonors ? (
            <ViewDonors />
          ) : viewDonations ? (
            <ViewDonations />
          ) : viewBloodStock ? (
            <BloodStock />
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Blood Bank Overview</h2>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <StatCard
                  icon={RiDropLine}
                  label="Total Blood Units"
                  value="1,285"
                />
                <StatCard
                  icon={RiUserHeartLine}
                  label="Active Donors"
                  value="856"
                />
                <StatCard
                  icon={RiCalendarEventLine}
                  label="Donations Today"
                  value="24"
                />
                <StatCard
                  icon={RiHospitalLine}
                  label="Hospitals"
                  value="32"
                />
              </div>

              {/* Blood Inventory Grid */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Blood Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <BloodTypeCard type="A+" level="125" status="normal" />
                <BloodTypeCard type="A-" level="45" status="critical" />
                <BloodTypeCard type="B+" level="98" status="normal" />
                <BloodTypeCard type="O-" level="38" status="low" />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
