import React, { useState } from "react";
import axios from "axios";
import { User, Phone, Building, Mail, Users } from "lucide-react";
import SignupForm from "../components/signup/SignupForm";
import Otpverification from "../components/signup/Otpverification";
function Signup() {
  const [step, setStep] = useState(1);
  const [firebaseResponse,setFirebaseResponse]=useState()
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    companyName: "",
    companyEmail: "",
    employeeSize: "",
  });

  console.log(formData,step)
  return (
    <>
      {step === 1 ? (
        <SignupForm
          setFormData={setFormData}
          formData={formData}
          setStep={setStep}
          setFirebaseResponse={setFirebaseResponse}
        />
      ) : (
        <Otpverification firebaseResponse={firebaseResponse} formData={formData} setStep={setStep} />
      )}
    </>
  );
}

export default Signup;
