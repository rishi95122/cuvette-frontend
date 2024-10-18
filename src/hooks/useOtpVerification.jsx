import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const useOtpVerification = (formData) => {
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isMobileVerified, setIsmobileVerified] = useState(true);
  
    const handleEmailOtp = async (emailOtp) => {
   
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BACKEND_URI}/api/auth/verify-otp`,
            { email: formData.companyEmail, otp: emailOtp }
          );
          if (response.status === 200) {
            setIsEmailVerified(true);
            toast.success(response.data.message);
            
          } else {
            toast.error("Invalid email OTP. Please try again.");
          }
        } catch (error) {
          console.error("Error verifying email OTP:", error);
          toast.error(error.response.data.message);
        }
      };
      const handleMobileOtp = async () => {
        try {
          const response = await axios.post("/api/verifymobile", {
            otp: 'mobileOtp',
          });
          if (response.data.success) {
            alert("Mobile verified successfully!");
          } else {
            alert("Invalid mobile OTP. Please try again.");
          }
        } catch (error) {
          console.error("Error verifying mobile OTP:", error);
          toast(
            "An error occurred while verifying the mobile OTP. Please try again."
          );
        }
      };
  return {isEmailVerified,isMobileVerified,handleMobileOtp,handleEmailOtp}
}

export default useOtpVerification