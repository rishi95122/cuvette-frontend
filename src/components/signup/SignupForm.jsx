import React, { useState } from 'react';
import axios from 'axios';
import { User, Phone, Building, Mail, Users, Loader } from "lucide-react";

function SignupForm({ setStep, formData, setFormData }) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // State to track field-specific errors

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setFieldErrors({ ...fieldErrors, [e.target.name]: null }); // Clear field-specific error when input changes
  };

  const validateFields = () => {
    const errors = {};
    if (!formData.name || formData.name.trim() === '') {
      errors.name = "Name is required";
    }
    if (!formData.phone || formData.phone.trim() === '') {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    if (!formData.companyName || formData.companyName.trim() === '') {
      errors.companyName = "Company name is required";
    }
    if (!formData.companyEmail || formData.companyEmail.trim() === '') {
      errors.companyEmail = "Company email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.companyEmail)) {
      errors.companyEmail = "Invalid email address";
    }
    if (!formData.employeeSize || formData.employeeSize.trim() === '') {
      errors.employeeSize = "Employee size is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BACKEND_URI}/api/auth/send-otp`, formData);
      if (response.status === 200) {
        setStep(2);
        setError(null);
        setSuccess("OTP sent successfully!");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      setSuccess(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto mt-10 p-4">
        <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
            <p className="text-gray-600 mb-6">Lorem Ipsum is simply dummy text</p>

            {success && <p className="text-green-600 mb-4">{success}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border ${fieldErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="Name"
                />
                {fieldErrors.name && <p className="text-red-500 text-sm mt-1">{fieldErrors.name}</p>}
              </div>

              {/* Phone Field */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border ${fieldErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="Phone no."
                />
                {fieldErrors.phone && <p className="text-red-500 text-sm mt-1">{fieldErrors.phone}</p>}
              </div>

              {/* Company Name Field */}
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border ${fieldErrors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="Company Name"
                />
                {fieldErrors.companyName && <p className="text-red-500 text-sm mt-1">{fieldErrors.companyName}</p>}
              </div>

              {/* Company Email Field */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border ${fieldErrors.companyEmail ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="Company Email"
                />
                {fieldErrors.companyEmail && <p className="text-red-500 text-sm mt-1">{fieldErrors.companyEmail}</p>}
              </div>

              {/* Employee Size Field */}
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="employeeSize"
                  value={formData.employeeSize}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-3 py-2 text-gray-700 bg-gray-100 border ${fieldErrors.employeeSize ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="Employee Size"
                />
                {fieldErrors.employeeSize && <p className="text-red-500 text-sm mt-1">{fieldErrors.employeeSize}</p>}
              </div>

              <p className="text-sm text-gray-500 mt-4">
                By clicking on proceed you will accept our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </p>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              >
                {loading ? <div className='w-full flex justify-center'><Loader className='animate-spin'/></div> : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignupForm;
