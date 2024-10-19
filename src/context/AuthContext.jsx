import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { auth } from "../firebase";
import { RecaptchaVerifier } from "firebase/auth";
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
      logout();
    }
  }

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("token");
  };
  function setUpRecaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
  }

  useEffect(() => {
    if (authToken) {
      isTokenExpired();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ setUser, user, setUpRecaptcha, authToken, setAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
