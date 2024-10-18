import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const db_url = import.meta.env.VITE_API_BACKEND_URI;
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  });
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });
  console.log(user);

  function isTokenExpired() {
    const decodedToken = jwtDecode(authToken);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      logout()
    }
  }
  const getUser = async () => {
    try {
      const user = await axios.get(`${db_url}/api/users/getuser`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (user.status !== 200) handleLogout();
    } catch (error) {
      console.error("Failed to fetch user:", error);
      handleLogout();
    }
  };
  const logout = () => {
   
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("token");

  };

 
  useEffect(() => {
    if (authToken) {
      isTokenExpired();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ setUser, user, authToken,setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
