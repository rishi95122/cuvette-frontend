import { useState } from "react";
import { ChevronDown, X } from "lucide-react";

import useJobs from "../hooks/useJobs";

const AddJob = () => {

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    candidates: [],
    newMail: "",
    endDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const{handleSubmit}=useJobs()
  const addMail = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const emails = formData.newMail
        .split(",")
        .map((email) => email.trim()) 
        .filter(
          (email) =>
            email && !formData.candidates.includes(email) 
        );

      if (emails.length > 0) {
        setFormData((prev) => ({
          ...prev,
          candidates: [...prev.candidates, ...emails],
          newMail: "", 
        }));
      }
    }
  };

  const deleteMail = (mailToDelete) => {
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.filter(
        (mail) => mail !== mailToDelete
      ),
    }));
  };

 

  return (
    <div className="min-h-screen bg-gray-50 ">
      <form
        className="max-w-2xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow"
        onSubmit={(e)=>handleSubmit({e,formData,setFormData})}
      >
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
            Add Candidates (comma-separated)
          </label>
          <div className="flex items-center space-x-2">
            <div className="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {formData.candidates.map((mail, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-gray-100 px-2 py-1 rounded-md text-xs text-gray-600"
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
                placeholder="Add multiple emails separated by commas"
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
              required
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
