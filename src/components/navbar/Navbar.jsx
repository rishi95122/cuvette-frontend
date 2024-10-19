
import React, { useContext, useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AuthContext } from "../../context/AuthContext";
import useLogin from '../../hooks/useLogin';

const Navbar = () => {
  const {user}=useContext(AuthContext)
  const {pathname}=useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
const {logout}=useLogin()
  const handleLogout = () => {
    logout()
 
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="flex justify-between border items-center p-4  mx-auto h-16 bg-white shadow-sm">
      <div className={`text-2xl font-bold ${pathname!=='/login' && pathname!=='/signup' &&  'max-md:ml-14'}`}>
        <Link to="/">

        C<span className="text-blue-600">u</span>vette        </Link>
      </div>
      
      <nav className="hidden md:flex items-center space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded border border-1">Login</Link>
            <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Sign Up</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">Logout</button>
        )}
      </nav>

      <div className="md:hidden">
     
        <button onClick={toggleMenu} aria-label="Toggle menu" className=" p-2 rounded-md bg-gray-100 text-gray-600 ">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md md:hidden">
          <nav className="flex flex-col space-y-4 p-4">
            {!user ? (
              <>
                <Link to="/login" onClick={toggleMenu} className="text-gray-600 px-4 py-2 rounded text-center border hover:text-gray-900">Login</Link>
                <Link to="/signup" onClick={toggleMenu} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">Sign Up</Link>
              </>
            ) : (
              <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center">Logout</button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar