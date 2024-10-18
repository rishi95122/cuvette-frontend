import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
    const nav=useNavigate()
    const {setAuthToken,setUser}=useContext(AuthContext)
  const login = async (email) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URI}/api/auth/login`,
        { email:email }
      );
      console.log(response)
      const  token  = response?.data;
      console.log(token)
      if(response.status===200 )
   {  
      setAuthToken(token);
      setUser(jwtDecode(token));
      localStorage.setItem("token", JSON.stringify(token));
      toast.success("LoggedIn");
      nav("/")
      setLoading(false);
      return true
}
  
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message)
      nav("/login")
    } 
  };


  const logout = () => {
   
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem("token");

  };

 


  return {

    login,
    logout,
 
    loading,
   
  };
};

export default useLogin;
