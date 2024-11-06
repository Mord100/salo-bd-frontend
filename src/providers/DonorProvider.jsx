import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import DonorContext from '../context/DonorContext' 
import { useCookies } from 'react-cookie'


export const useDonor = () => useContext(DonorContext)

const DonorProvider = ({ children }) => {
  const [donor, setDonor] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  useEffect(() => {
    // console.log('Token from cookies:', cookies.token)

    const getDonor = async () => {
      try {
        const token = cookies.token;
        const response = await axios.get('http://localhost:3000/api/donors',{
          headers: {
            'x-auth-token': token
          }
        })
        setDonor(response.data)
      } catch (error) {
        console.error('Error geting donor:', error)
      }
    }

    getDonor()
  }, [cookies.token])

  const createDonor = async (donor) => {
    try {
      const token = cookies.token;
      const response = await axios.post('http://localhost:3000/api/donors', donor, {
        headers: {
          'x-auth-token': token
        }
      })
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