import axios from 'axios'
import { Calendar, Briefcase, Clock, Bell } from 'lucide-react'
import toast from 'react-hot-toast'
const JobCard = ({ job }) =>{ 
  const notifyUsers=async()=>{
    try {
      const response =await axios.post(`${import.meta.env.VITE_API_BACKEND_URI}/api/email/notify`,job)
      if(response.status===200)
      {
        toast.success("All users notified.")
      }
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  
  return (
    <div className="bg-white flex flex-col justify-between shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.jobTitle}</h2>
        <p className="text-gray-600 mb-4">{job.jobDescription}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Application Deadline: {job.endDate.toString().slice(0,10)}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Briefcase className="h-4 w-4 mr-2" />
          <span>Experience: {job.experienceLevel}</span>
        </div>
      </div>
      {job?.candidates.length>0 &&  <div className="flex items-center space-x-2 px-2">
            <div className="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {job?.candidates.slice(0,6).map((mail, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-gray-100 px-1 py-1 rounded-md text-xs text-gray-600"
                  >
                    {mail}
                  
                  </span>
                ))}
              </div>
           
            </div>
          </div>}
     
      <div className="px-6 py-4 bg-gray-100">
        <button onClick={notifyUsers} className="bg-blue-500 flex items-center gap-1 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
         <Bell/> Notify Again
        </button>
      </div>
    </div>
  )}
  export default JobCard