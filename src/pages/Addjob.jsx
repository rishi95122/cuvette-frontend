import React, { useContext, useState } from "react";
import { ChevronDown, X, Calendar } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddJob = () => {
  const {authToken,user}=useContext(AuthContext)
  const nav=useNavigate()
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: ["uditya951@gmail.com", "udityakumar2000@gmail.com"],
    newMail: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const addMail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (formData.newMail && !formData.candidates.includes(formData.newMail)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          candidates: [...prevFormData.candidates, formData.newMail],
          newMail: "",
        }));
      }
    }
  };

  const deleteMail = (mailToDelete) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      candidates: prevFormData.candidates.filter((mail) => mail !== mailToDelete),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const headers = {
      Authorization: `Bearer ${authToken}`, 
    };


    try {
      const response = await axios.post(`${ import.meta.env.VITE_API_BACKEND_URI}/api/jobs`, formData,{
        headers
      });
      if(response.status===200)
      toast.success("Job added successfully");

     
      setFormData({
        jobTitle: "",
        jobDescription: "",
        experienceLevel: "",
        candidates: [],
        newMail: "",
        endDate: "",
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="jobTitle"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            placeholder="Enter Job Title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="jobDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Job Description
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={4}
            value={formData.jobDescription}
            onChange={handleInputChange}
            placeholder="Enter Job Description"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="experienceLevel"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Experience Level
          </label>
          <div className="relative">
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              required
            >
              <option value="">Select Experience Level</option>
              <option value="entry">Entry Level</option>
              <option value="intermediate">Intermediate</option>
              <option value="senior">Senior</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        <div>
          <label
            htmlFor="addCandidate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Add Candidate
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {formData.candidates.map((mail, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-600"
                  >
                    {mail}
                    <button
                      type="button"
                      onClick={() => deleteMail(mail)}
                      className="ml-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                      aria-label={`Remove ${mail}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="email"
                id="newMail"
                name="newMail"
                placeholder="Add more"
                value={formData.newMail}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && addMail(e)}
                className="w-full focus:outline-none"
                aria-label="Add candidate email"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            End Date
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              placeholder="Select a Date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default AddJob;
