import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CreateBoard = () => {

   const [titleInput,setTitleInput] = useState('')

   const navigate = useNavigate()

   const handleSubmit = async (e) =>{
    e.preventDefault()

    // api call 

   const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/board/createBoard`,{title:titleInput},{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })

    if(response.status == 201){
        alert('board created successfully')
        navigate('/dashboard')
    }
    

   }
    
    return (
        <div>
            <div className=' flex justify-center mt-40'>

                <form onSubmit={handleSubmit} className='flex flex-col gap-2 border rounded-md w-full mx-2 sm:w-[50%] md:w-[30%] p-6'>
                    <div className='text-xl font-bold'>Create Board</div>

                    <div className='flex flex-col'>
                        <label className='font-semibold' htmlFor="">Title:</label>
                        <input value={titleInput} onChange={(e)=>setTitleInput(e.target.value)} type="text" placeholder='Enter Title of the board' className='border p-1 rounded-md' />
                    </div>

                    <button className='bg-green-800 text-white py-1 rounded-md'>
                        Create Board
                    </button>
                </form>

            </div>
        </div>
    )
}

export default CreateBoard
