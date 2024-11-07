import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import DonationsContext from '../context/DonationsContext' 
import { useCookies } from 'react-cookie'

export const useDonations = () => useContext(DonationsContext)

const DonationsProvider = ({ children }) => {
  const [donations, setDonations] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  useEffect(() => {
    // console.log('Token from cookies:', cookies.token)
    const fetchDonations = async () => {
      try {
        const token = cookies.token
        const response = await axios.get('http://localhost:3000/api/donations', {
          headers: {
            'x-auth-token': token
          }
        })
        setDonations(response.data)
      } catch (error) {
        console.error('Error fetching donations:', error)
      }
    }

    fetchDonations()
  }, [cookies.token])

  const createDonation = async (donation) => {
    try {
      const token = cookies.token;
      console.log('Donation data being sent:', donation); // Log the donation data
      const response = await axios.post('http://localhost:3000/api/donations', donation, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      setDonations([...donations, response.data]);
    } catch (error) {
      console.error('Error creating donation:', error.response.data);
    }
  };

  return (
    <DonationsContext.Provider value={{ donations, createDonation }}>
      {children}
    </DonationsContext.Provider>
  )
}

export default DonationsProvider