import { Moon, Sun, SunMoon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const TodoHome = () => {

    const [inputValue, setInputValue] = useState('')
    const [todos, setTodos] = useState([])
    const [editableTodoId, setEditableTodoId] = useState(-1)
    const [editedValue, setEditedValue] = useState('')
    const [selectedFilter, setFilter] = useState('all')
    const [darkMode, setDarkMode] = useState(false)
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]')
    const editInputRef = useRef(null)



    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'dark') {
            setDarkMode(true)
        }
    }, [])
    
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
           
        } else {
            document.documentElement.classList.remove('dark')
           
        }
    }, [darkMode])

    // to toggle theme
    const toggleTheme = () => {
        const newTheme = !darkMode
        setDarkMode(newTheme)
        localStorage.setItem('theme', newTheme ? 'dark' : 'light')
    }

    // Load todos from localStorage on component mount
    useEffect(() => {
        setTodos(storedTodos)
    }, [])
    console.log('allTodos--', todos)

    // apply filters 
    useEffect(() => {
        if (selectedFilter == 'all') {
            return setTodos(storedTodos)
        }
        const filteredTodos = storedTodos.filter((item) => item.status == selectedFilter)
        setTodos(filteredTodos)
    }, [selectedFilter])

    useEffect(() => {
        if (editableTodoId !== -1 && editInputRef.current) {
            editInputRef.current.focus()
        }
    }, [editableTodoId])


    // to add todo
    const addTodo = () => {
        const newTodo = [...todos, { id: uuidv4(), title: inputValue, status: 'pending' }]
        localStorage.setItem('todos', JSON.stringify(newTodo))
        setTodos(newTodo)
        setInputValue('')
    }

    // to delete todo
    const handleDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
        setTodos(updatedTodos)
    }

    // to update status
    const handleStatus = (e, id) => {
        const isChecked = e.target.checked
        const updatedTodos = todos.map((todo) => {
            if (todo.id == id) {
                return {
                    ...todo,
                    status: isChecked ? 'complete' : 'pending'
                }
            }

            return todo
        })
        localStorage.setItem('todos', JSON.stringify(updatedTodos))
        setTodos(updatedTodos)



    }

    const handleEdit = (e, todo) => {

        if (e.target.innerText == 'Update') {
            const updateTodos = todos.map((item) => {
                if (item.id == todo.id) {
                    return { ...item, title: editedValue }
                }
                return item
            })

            localStorage.setItem('todos', JSON.stringify(updateTodos))
            setTodos(updateTodos)
            setEditableTodoId(-1)
            setEditedValue('')
            return
        } else {
            // open edit box
            setEditableTodoId(todo.id)
            setEditedValue(todo.title)
        }

    }

    return (
        <div className=''>
            <div className='border dark:bg-black  w-7xl mx-auto h-screen'>
                <div className='text-3xl flex justify-between px-6 font-bold text-center mt-10 dark:text-white'>
                    <span>Todo App</span>
                    <button
                        onClick={toggleTheme}
                        className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
                    >
                        {darkMode ? <Sun /> : <Moon />}
                    </button>
                </div>
                <div className=' flex justify-center gap-4 my-16 '>
                    <input
                        type="text"
                        className='border border-gray-900 rounded-md px-2 w-2xs placeholder:text-black'
                        placeholder='Enter Todo..'
                        value={inputValue}
                        
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={() => addTodo()} className='bg-blue-500 text-white px-4 py-2 rounded-md'>Add</button>
                </div>
                <div className='w-[80%] mx-auto'>
                    <div className=' flex gap-2 justify-end dark:text-white my-4'>
                        <span>Filter: </span>
                        <select value={selectedFilter} onChange={(e) => setFilter(e.target.value)} className=' border text-black rounded-md px-2' name="" id="">
                            <option value="all">All</option>
                            <option value="complete">completed</option>
                            <option value="pending">pending</option>
                        </select>
                    </div>
                    <div className='border border-black  flex flex-col items-center gap-4 py-4 rounded-md'>
                        {/* map todos here */}
                        {todos.length > 0 ? (todos?.map((todo) => (
                            <div key={todo.id} className='flex justify-between border border-black w-[50%] py-2 px-2 rounded-md dark:text-white'>

                                <div className='flex  gap-3 '>
                                    <input type="checkbox" name="" checked={todo.status == 'complete'} onChange={(e) => handleStatus(e, todo.id)} className='w-4' />
                                    {editableTodoId == todo.id ? (<input type='text' ref={editInputRef} value={editedValue} onChange={(e) => setEditedValue(e.target.value)} onBlur={()=>setEditableTodoId(-1)} className='border border-black rounded-md px-2 ' />) : (<span className={`text-xl ${todo.status == 'complete' && 'line-through'} `}>{todo.title}</span>)}
                                </div>
                                <div className='flex gap-1'>
                                    <button onClick={(e) => handleEdit(e, todo)} className='px-4 bg-green-600 text-white py-1 rounded-md '>{editableTodoId == todo.id ? 'Update' : 'Edit'}</button>
                                    <button onClick={() => handleDelete(todo.id)} className='px-4 bg-red-600 text-white py-1 rounded-md '>Delete</button>
                                </div>

                            </div>
                        ))) : <div className='text-xl font-bold'> No Todo Available </div>}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TodoHome
