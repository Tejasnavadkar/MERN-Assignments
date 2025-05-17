import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const CreateTask = () => {

  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    assignedTo: ''
  })

  const [users, setUsers] = useState()
  const params = useParams()
  const navigate = useNavigate()

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

  const FetchExistingTask = async () => {
    // console.log('hi')

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/task/getTask/${params.taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status == 201) {
      console.log('task', response.data.task)
      setTaskInfo({
        title: response.data?.task?.title,
        description: response.data?.task?.description,
        assignedTo: response.data?.task?.assignedTo
      })
    }

  }


  useEffect(() => {
    FetchUsers()
  }, [])

  useEffect(() => {
    params.taskId && FetchExistingTask()
  }, [params])


  const formSubmit = async (e) => {
    e.preventDefault()

    const newData = taskInfo
    if (!params.taskId) {

      //api for create task
      newData['listId'] = params.listId
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/task/createTask`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status == 201) {
        navigate('/dashboard')
      }
    }else{
      //api for update task
       const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/task/updateTask/${params.taskId}`, newData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status == 200) {
        navigate('/dashboard')
      }

    }


  }

  const handleChange = (e) => {

    setTaskInfo((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value
      }
    ))

  }


  return (
    <div>
      <div>

        <form onSubmit={formSubmit} className='border h-screen flex flex-col justify-center items-center '>
          <div className='text-xl font-semibold my-2'>

           {params.taskId ? "Update task" : "Create Task"}

          </div>
          <div className='border space-y-2 w-[75%] sm:w-[50%] md:w-[25%] p-4 rounded-md '>
            <div className='flex flex-col gap-2'>
              <label htmlFor="">Title</label>
              <input
                type="text"
                name='title'
                placeholder='title'
                value={taskInfo?.title}
                onChange={handleChange}
                className='border p-1 rounded-md bg-gray-200' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="">Description</label>
              <input
                type="text"
                name='description'
                value={taskInfo?.description}
                onChange={handleChange}
                placeholder='description'
                className='border p-1 rounded-md bg-gray-200' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="">assignedTo</label>
              {/* <input type="text" placeholder='assignedTo' className='border p-1 rounded-md bg-gray-200' /> */}
              <select
                value={taskInfo?.assignedTo || ''}
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
            <button className='bg-green-700 w-full py-2 rounded-md' >{params.taskId ? "update task" : "Create Task"}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateTask


// {
//     "listId":"681db2494364658c55845fb5",
//     "title":"design navbar",
//     "description":"add some css to navbar",
//     "assignedTo":"681c95d50c4bbcbf0d8c3724"
// }