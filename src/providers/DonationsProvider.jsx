import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import DonationsContext from '../context/DonationsContext' 

export const useDonations = () => useContext(DonationsContext)

const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([])

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/donations')
        setDonations(response.data)
      } catch (error) {
        console.error('Error fetching donations:', error)
      }
    }

    fetchDonations()
  }, [])

  const createDonation = async (donation) => {
    try {
      const response = await axios.post('http://localhost:3000/api/donations', donation)
      setDonations([...donations, response.data])
    } catch (error) {
      console.error('Error creating donation:', error)
    }
  }

  return (
    <DonationsContext.Provider value={{ donations, createDonation }}>
      {children}
    </DonationsContext.Provider>
  )
}

export default DonationsProvider