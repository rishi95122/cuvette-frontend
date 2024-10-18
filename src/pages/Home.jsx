import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const nav=useNavigate()
  return (
    <div>
        <button onClick={()=>nav('/addjob')}  className=" py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 w-fit">Create Interview</button>
    </div>
  )
}

export default Home