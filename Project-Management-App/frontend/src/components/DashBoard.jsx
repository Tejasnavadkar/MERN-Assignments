import React, { useRef } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DashBoard = () => {

  const [boards, setBoards] = useState(null)
  const dragItem = useRef()
  const dragContainer = useRef()
  const [dragContainerId,setdragContainerId] = useState()
  const [updatedTask, setUpdatedTask] = useState()
  const navigate = useNavigate()

  const FetchBoards = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/board/getBoards`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.status == 201) {
        setBoards(response.data.allBoards)
      }
    } catch (error) {
      throw new Error(`err in FetchBoards function: ${error}`)
    }

  }

  useEffect(() => {
    // api call to get All boards
    FetchBoards()
  }, [updatedTask])
  console.log('boards-', boards)

  const handleDelete = async (taskId, listId) => {

    // delete task api

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/task/deleteTask/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          data: { listId: listId } // For DELETE requests, data needs to be passed in the 'data' property
        }
      );

      if (response.status === 200) {
        alert('Task deleted successfully');
        // Refresh the board data
        FetchBoards();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }

  }

  const deleteBoard = async (boardId) =>{

   const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/board/deleteboard/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        })

      if(response.status == 200){
        alert('board deleted successfully')
        FetchBoards()
      }

  }

  const deleteList = async (listId,boardId) => {

     const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/list/deletelist/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          data:{
            boardId:boardId
          }
        })

        if(response.status == 200){
          alert('list Deleted')
          FetchBoards()
        }

  }

  const handleLogout = () =>{
      // Todo: make api to logout in backend 
        localStorage.clear()
        navigate('/')
  }

  // drag-n-drop handlers

  const handleDragStart = (e, task, list) => {

    // dragable item ko set kiya
    // and container me list ko save kiya
    e.target.style.opacity = '0.5' // we reduce opacity of element from source list
    dragItem.current = task
    dragContainer.current = list
  }

  const handleDragEnd = (e) => {
    // on drop opacity of element is goinig to be 1
    e.target.style.opacity = '1'
  }
 
  // api hit after item drop
  const handleDrop = async (e, list) => {

    // this executes when we drop item on div and then make api call to change the its position
    const destinationList = list
    const sourceList = dragContainer
    const task = dragItem

    console.log('sourceList--', sourceList)
    console.log('destinationList--', destinationList)
    console.log('task--', task)
    setdragContainerId() // hover border ko reset kiya

    // api call
    const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/api/task/moveTask/${task.current._id}`, {
      sourceLiId: sourceList.current._id,
      destinationListId: destinationList._id
    },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
    if (response.status == 200) {
      console.log('response--', response.data)
      setUpdatedTask(response?.data)
    }
  }

  // here we handle hum apana item drag karke kis kis list ke upar se le ja rahe hai
  const handleDragOver = (e,list) => {
    e.preventDefault() 
    // prevent karo otherwise element drag nahi hoga (this actual indentify ki humara jo drag item hai kis div ke upar hai)
    // eg- agar item todo list me hai and mene use drag karake done pe hover kiya drop nahi kiya sirf hover kiya to to 
    // jis list pe hover kiya uska data mil jayega
    console.log('onDragOver-',list)
    // here hum jis bhi list ke upar hamara div ayega uski id set karenge so uske hisab se hum styling karenge scale ko badha denge
    setdragContainerId(list._id) 
  }



  return (
    <div>

      {/* Nav-bar  */}
      <nav className='flex justify-between px-4 my-4 border p-2 rounded-md mx-2 items-center'>
        <div className='text-xl font-bold'>Trello-lite</div>
        <div className='flex gap-2'>
          <Link to={'/createBoard'} className='bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer'>
            Add Board
          </Link>

          <button onClick={handleLogout} className='bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer'>
            Logout
          </button>
        </div>
      </nav>

      <div className='border w-[95%] mx-auto'>
        <div className='flex justify-center text-xl font-semibold my-4'>
          All Boards
        </div>
        {/* Bord  */}
        {/* map boards */}

        <div className='space-y-6'>
          {
            boards ? (boards?.map((board, idx) => (
              <div key={idx} className='border space-y-3'>
                 {/* create, add member, delete buttons  */}
                <div className='flex justify-between items-center mt-2 px-2' >
                  <span className='text-xl font-semibold px-2 '>{board?.title}</span>
                  <span className='flex items-center gap-3'>
                    <Link to={`/createList/${board._id}`} className='bg-green-700 text-white px-2 py-1 rounded-md cursor-pointer'>Create List</Link>
                    <Link to={`/addMember/${board._id}`} className='bg-green-700 text-white px-2 py-1 rounded-md cursor-pointer'>Add Member</Link>
                    <button onClick={()=>deleteBoard(board._id)} className='bg-red-700 text-white px-2 py-1 rounded-md cursor-pointer' >Delete</button>
                  </span>
                </div>

                <div className='flex gap-2 border justify-evenly h-[500px] py-5'>
                  {
                    board.lists?.length > 0 ? (board?.lists?.map((list, idx) => (
                      // lists (todos, in-progress, done etc)
                      <div
                        key={idx}
                        onDrop={(e) => handleDrop(e, list)}
                        onDragOver={(e)=>handleDragOver(e,list)}
                        className={` ${dragContainerId === list._id ? "border border-blue-500 scale-102 transition delay-1 duration-300 ease-in-out" : "p-0"}   w-80 space-y-1 grid grid-rows-10`}>
                        <div className='font-semibold border row-span-1 flex items-center justify-center'>{list?.title}</div>
                        <div className='border border-b-cyan-950 row-span-7 overflow-scroll p-2'>
                          {/* render tasks here  */}
                          <ul className='space-y-2'>
                            {
                              list?.tasks?.map((task, idx) => (
                                <li
                                  key={idx}
                                  draggable // now we can drag this item
                                  onDragStart={(e) => handleDragStart(e, task, list)} // here jaise hi hum item ko select karenge hum item and list ko set kardenge
                                  onDragEnd={(e) => handleDragEnd(e)} // here we prevent its behaviour
                                  className='flex flex-col border rounded-md p-2 bg-gray-200 cursor-move'>
                                  <span className=' text-xl font-semibold'>{task?.title}</span>
                                  <span>{task?.description}</span>
                                  <div className='w-full flex justify-end space-x-2 items-center '>
                                    <Link className='text-sm font-semibold text-blue-800  ' to={`/updateTask/${task._id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(task._id, list._id)} className='text-sm cursor-pointer font-semibold text-red-800 '>Delete</button>
                                  </div>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                        <Link to={`/createTask/${list._id}`} className='border row-span-1 flex items-center justify-center cursor-pointer bg-green-800 rounded-md text-white'>Add Task</Link>
                        <button onClick={()=>deleteList(list._id,board._id)} className='border row-span-1 flex items-center justify-center cursor-pointer bg-red-800 rounded-md text-white' >Delete list</button>
                      </div>
                    ))) : (<div className='text-xl font-semibold border flex w-full justify-center items-center'>
                      lists are not created yet
                    </div>)
                  }
                </div>

              </div>
            ))) : (<div>
              Boards Not Available
            </div>)
          }
        </div>
      </div>
    </div>
  )
}

export default DashBoard
