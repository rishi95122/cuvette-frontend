import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/jobcard/JobCard'
import { AuthContext } from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'

function YourJobs() {
  const { user, authToken } = useContext(AuthContext)
  const [data, setData] = useState([])
  const nav=useNavigate()
  console.log(user)
  if(!user)
  {
    nav("/login")
    return;
  }
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
      toast.error(error.response?.data?.error || 'An error occurred while fetching jobs.')
    }
  }

  useEffect(() => {
    if(user)
    getJobs()
  }, [user])

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10">
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
