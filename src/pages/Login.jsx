
import { useState } from 'react'
import { Mail, Lock } from 'lucide-react'

import useLogin from '../hooks/useLogin'

export default function Login() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')
  const {loading,handleEmailSubmit,handleOtpSubmit}=useLogin()



  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="flex flex-col md:flex-row max-w-7xl mx-auto p-4 items-center">
        <div className="md:w-1/2 pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-600">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="text-gray-600 text-sm">Enter your email to receive a one-time password</p>
            </div>
            <div>
              {step === 'email' ? (
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Company Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={()=>handleEmailSubmit(email,setStep)}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </form>
              ) : (
                <form  className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">One-Time Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        id="otp"
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={()=>handleOtpSubmit(email,otp)}
                    className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading||loading ? 'Verifying...' : 'Login'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}