import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import DonorContext from '../context/DonorContext' 

export const useDonor = () => useContext(DonorContext)

const DonorProvider = ({ children }) => {
  const [donor, setDonor] = useState([])

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/donors')
        setDonor(response.data)
      } catch (error) {
        console.error('Error fetching donor:', error)
      }
    }

    fetchDonor()
  }, [])

  const createDonor = async (donor) => {
    try {
      const response = await axios.post('http://localhost:3000/api/donors', donor)
      setDonor([...donor, response.data])
    } catch (error) {
      console.error('Error creating donation:', error)
    }
  }

  return (
    <DonorContext.Provider value={{ donor, createDonor }}>
      {children}
    </DonorContext.Provider>
  )
}

export default DonorProvider