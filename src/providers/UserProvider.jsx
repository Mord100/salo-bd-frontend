import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import UserContext from '../context/UserContext';

// Custom hook to use the User Context
export const useUser = () => useContext(UserContext);

// User Provider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold user information
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [cookies, setCookie, removeCookie] = useCookies(['token']); // Use cookies for token storage

  useEffect(() => {
    // Check if token exists in cookies and set user state accordingly
    if (cookies.token) {
      setUser({ token: cookies.token });
    }
  }, [cookies.token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/admin/login', { email, password });
      setUser(response.data.user); // Set user data from response
      setCookie('token', response.data.token); // Store token in cookies
      return response.data; // Return the response data
    } catch (error) {
      console.error('Login failed:', error.response.data.message);
      throw error; // Rethrow error for handling in components
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null); // Clear user data
    removeCookie('token'); // Remove token from cookies
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;