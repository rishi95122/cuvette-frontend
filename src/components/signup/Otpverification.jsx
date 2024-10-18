import  { useState } from "react";
import {  CheckCircle2, Mail, Phone } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

import useOtpVerification from "../../hooks/useOtpVerification";
import { useNavigate } from "react-router-dom";
const Otpverification = ({ formData }) => {
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
const nav=useNavigate()
 const {handleEmailOtp,isEmailVerified,isMobileVerified}=useOtpVerification(formData)

  const handleRegister=async()=>{
    try {
      const response= await axios.post(`${import.meta.env.VITE_API_BACKEND_URI}/api/auth/signup`,formData)
        if(response.status===200)
          toast.success("Registered Successfully")
            nav("/login")
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  if(isEmailVerified&&isMobileVerified)
  {
   handleRegister()
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto mt-10 p-4">
        <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
            <p className="text-gray-600 mb-6">
              Lorem Ipsum is simply dummy text
            </p>
            <form className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Email OTP"
                  disabled={isEmailVerified}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Email OTP"
                />

                {isEmailVerified && (
                  <CheckCircle2
                    className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    size={20}
                  />
                )}
              </div>
              {!isEmailVerified && (
                <button
                  type="button"
                  onClick={()=>handleEmailOtp(emailOtp)}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                  Verify Email
                </button>
              )}

              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Mobile OTP"
                  onChange={(e) => setMobileOtp(e.target.value)}
                  disabled
                  className="w-full cursor-not-allowed pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Mobile OTP"
                />
                {isMobileVerified && (
                  <CheckCircle2
                    className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                    size={20}
                  />
                )}
              </div>
              {!isMobileVerified && (
                <button
                  type="button"
                  // onClick={handleMobileOtp}

                  className="w-full cursor-not-allowed py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                >
                  Verify Mobile
                </button>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Otpverification;
