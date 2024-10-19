import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useOtpVerification = (formData) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isMobileVerified, setIsmobileVerified] = useState(false);

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
  const handleMobileOtp = async (firebaseResponse, mobileOtp) => {
    console.log(firebaseResponse, mobileOtp);
    firebaseResponse
      ?.confirm(mobileOtp)
      .then(() => {
        toast.success("Mobile otp verified");
        setIsmobileVerified(true);
      })
      .catch((err) => toast.error("Invalid Otp", err?.error));
  };
  return { isEmailVerified, isMobileVerified, handleMobileOtp, handleEmailOtp };
};

export default useOtpVerification;
