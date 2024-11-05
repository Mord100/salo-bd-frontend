import React from 'react'

const Banner = () => {
  return (
    <div className="bg-gradient-to-r p-20 mx-20 mt-10 rounded-md from-blue-500 to-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Blood Donation Management System
          </h1>
          <p className="text-lg mb-6">
            Welcome to BDMS - A comprehensive platform designed to streamline blood donation processes and save lives. We connect donors with those in need, making blood donation more accessible and efficient.
          </p>
          {/* <div className="flex gap-4">
            <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Donate Now
            </button>
            <button className="border-2 border-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              Learn More
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Banner