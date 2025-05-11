import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({children}) => {

    const [isAuthenticated,setIsAuthenticated] = useState(null)
    const navigate = useNavigate()

   useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token !== null){
        setIsAuthenticated(true)
    }else{
        setIsAuthenticated(false)
    }
   },[])

   useEffect(()=>{
        if(isAuthenticated == false){
            navigate('/')
        }
   },[isAuthenticated,navigate])

   if(isAuthenticated == null){
    return <div className='h-full w-full flex justify-center items-center'>
        Loading..
    </div>
   }

  return (
    <div>
       {children}
    </div>
  )
}

export default Protected
