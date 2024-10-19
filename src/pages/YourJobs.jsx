import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/jobcard/JobCard'
import { AuthContext } from '../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

function YourJobs() {
  const { user, authToken } = useContext(AuthContext)
  const [data, setData] = useState([])

  console.log(user)

  const getJobs = async () => {
    try {
      if (user) {
        const headers = {
          Authorization: `Bearer ${authToken}`, 
        };
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URI}/api/jobs/${user._id}`, { headers })
        setData(response.data)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error || 'An error occurred while fetching jobs.')
    }
  }

  useEffect(() => {
   
    getJobs()
  }, [user])
    if(!user)
      return <div className='text-blue-400 font-bold'>please <Link to="/login" className='underline'>login</Link> to view jobs.</div>
    if(user && data.length==0)
      return <div className='text-blue-400 font-bold'>No jobs found!</div>
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 rounded-xl lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-extrabold text-blue-400 text-center mb-10">
          Jobs posted by you
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default YourJobs
