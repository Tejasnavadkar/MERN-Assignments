import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const allTodos = JSON.parse(localStorage.getItem('todos'))
    const [totalTodos,setTotalTodos] = useState([])
    const [completedTodos,setCompletedTodos] = useState([])
    const [pendingTodos,setPendingTodos] = useState([])

    useEffect(()=>{

        setTotalTodos(totalTodos.length)
        const completed = allTodos.filter((item)=>item.status == 'complete')
        const pending = allTodos.filter((item)=>item.status == 'pending')
        setCompletedTodos(completed)
        setPendingTodos(pending)

    },[])
    console.log('alltodo-',allTodos)
    return (
        <div className='h-screen dark:text-white border border-black w-[90%] mx-auto '>
            <div className='text-center text-2xl font-bold py-11'>Dashboard</div>
            <div className='px-6 py-5'>
                <span className='text-2xl font-semibold'>Analytics</span>

                <div className='grid grid-cols-3 mt-12 h-12 gap-2' >
                    <div className=' border-2 border-red-600 rounded-md px-6  '>
                        <div className='text-xl font-bold '>Total Todos</div>
                        <div className='text-lg font-semibold'>{allTodos?.length}</div>
                    </div>
                    <div className=' border-2 border-yellow-600 rounded-md px-6 '>
                        <div className='text-xl font-bold '>Completed Todos</div>
                        <div className='text-lg font-semibold'>{completedTodos?.length}</div>
                    </div>
                    <div className=' border-2 border-blue-600 rounded-md px-6 '>
                        <div className='text-xl font-bold '>Pending Todos</div>
                        <div className='text-lg font-semibold'>{pendingTodos?.length}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
