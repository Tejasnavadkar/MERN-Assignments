import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {

     const [signupInfo, setsignUpInfo] = useState({
        username: "",
        email: "",
        password: "",
    });
    // const [validationErrors,setValidationErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log('signupInfo--',signupInfo)
        // api call 

         try {
            // console.log(`${import.meta.BASE_URL}/api/user/signup`)
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/registerUser`,signupInfo)
            
            if(response.status == 201){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('loggedInUser',JSON.stringify(response.data.user))
            navigate('/dashboard')
            }

           } catch (error) {
            console.error('err',error)
            
           }
    }

    const handleChange = (e) =>{
        setsignUpInfo(prev=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={signupInfo.username}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter name"
                        />
                        {/* {validationErrors.name && <span className="text-sm text-red-600">{validationErrors.name}</span>} */}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={signupInfo.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                        {/* {validationErrors.email && <span className="text-sm text-red-600">{validationErrors.email}</span>} */}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={signupInfo.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                          {/* {validationErrors.password && <span className="text-sm text-red-600">{validationErrors.password}</span>} */}
                    </div>

             

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-500">
                    Already have an account? <Link to={'/'} className="text-blue-600">login</Link>
                </p>
            </div>
        </div>
  )
}

export default SignUp
