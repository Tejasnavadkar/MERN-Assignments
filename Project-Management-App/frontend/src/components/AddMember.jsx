import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const AddMember = () => {

    const [users,setUsers] = useState()
    const [memberId,setMemberId] = useState()
    const {boardId} = useParams()

     const FetchUsers = async () => {
        // userapi call
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/getUsers`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
    
        if (response.status == 201) {
          setUsers(response.data.allUsers)
        }
    
      }

      useEffect(()=>{
        FetchUsers()
      },[])

      const formSubmit = async (e) =>{
        e.preventDefault()
        console.log('memberId-',memberId)
        console.log('boardId-',boardId)
        // api call 

        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/board/updateBoard/${boardId}/members`, {memberId:memberId} , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if(response.status == 200){
            alert('member added')
        }

        } catch (error) {
            console.log(`error in addmember component:`,error.message)
            throw new Error(error.message)
        }
       
      }

      const handleChange = async (e) =>{
            setMemberId(e.target.value)
      }


  return (
     <div>
      <div>

        <form onSubmit={formSubmit} className='border h-screen flex flex-col justify-center items-center '>
          <div className='text-xl font-semibold my-2'>

           Add Member

          </div>
          <div className='border space-y-2 w-[75%] sm:w-[50%] md:w-[25%] p-4 rounded-md '>

            <div className='flex flex-col gap-2'>
              <label htmlFor="">Add Member</label>
              {/* <input type="text" placeholder='assignedTo' className='border p-1 rounded-md bg-gray-200' /> */}
              <select
                // value={taskInfo?.assignedTo || ''}
                onChange={handleChange}
                name='assignedTo'
                className='border rounded-md'
                id="">
                <option value="">select User</option>
                {
                  users?.map((user) => (
                    <option key={user._id} value={`${user._id}`}>{user.username}</option>
                  ))
                }
              </select>
            </div>
            <button className='bg-green-700 w-full py-2 rounded-md' >Add Members</button>
            <Link to={'/dashboard'} className='text-blue-900 underline' >Go Back</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddMember
