import React, { useState } from 'react'

const CreateDonation = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    donationDate: '',
    bloodType: '',
    quantityMl: '',
    donationCenter: ''
  })

  const [eligibility, setEligibility] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Handle form submission
    console.log(formData)
  }

  const checkEligibility = () => {
    const lastDonationDate = new Date(formData.donationDate)
    const fourMonthsAgo = new Date()
    fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4)
    if (lastDonationDate < fourMonthsAgo) {
      setEligibility(false)
    } else {
      setEligibility(true)
    }
  }

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <div className="w-full px-20 mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Create New Blood Donation</h2>
      <p className="text-center text-gray-600 mb-8">Please fill out all required information to register a new blood donation</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Donor Name</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter donor name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Donation Date</label>
            <input
              type="date"
              name="donationDate"
              value={formData.donationDate}
              onChange={(e) => {
                handleChange(e)
                checkEligibility()
              }}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Blood Type</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              <option value="">Select Blood Type</option>
              {bloodTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantity (mL)</label>
            <input
              type="number"
              name="quantityMl"
              value={formData.quantityMl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter quantity in mL"
              min="0"
              required
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Donation Center</label>
            <input
              type="text"
              name="donationCenter"
              value={formData.donationCenter}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter donation center name"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            disabled={eligibility === false}
          >
            Submit Donation
          </button>
          {eligibility === false && <p className="text-red-500 mt-2">You are not eligible for a donation.</p>}
        </div>
      </form>
    </div>
  )
}

export default CreateDonation