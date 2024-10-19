import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/jobcard/JobCard'
import { AuthContext } from '../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import YourjobsSkeltons from '../components/skeltons/YourjobsSkeleton'

function YourJobs() {
  const { user, authToken } = useContext(AuthContext)
  const [data, setData] = useState([])
  const [loading,setLoading]=useState(false)
  const getJobs = async () => {
    setLoading(true)
    try {
      if (user) {
        const headers = {
          Authorization: `Bearer ${authToken}`, 
        };
        const response = await axios.get(`${import.meta.env.VITE_API_BACKEND_URI}/api/jobs/${user._id}`, { headers })
        setData(response.data)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.error || 'An error occurred while fetching jobs.')
    }
  }

  useEffect(() => {
    getJobs()
  }, [user])

    if(!user)
      return <div className='text-blue-400 font-bold'>please <Link to="/login" className='underline'>login</Link> to view jobs.</div>
    if(loading )
      return   <div className="grid gap-6 md:grid-cols-2 mt-20 lg:grid-cols-3"><YourjobsSkeltons /><YourjobsSkeltons /><YourjobsSkeltons /></div>
    if(user && data.length===0 && !loading)
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
