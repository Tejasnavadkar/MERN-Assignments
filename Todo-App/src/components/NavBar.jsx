import { Moon, Sun } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const NavBar = () => {

    const [darkMode, setDarkMode] = useState(false)

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


    return (
        <div>
            <div className=' flex justify-between px-6 items-center text-center dark:text-white py-4'>
                <div>
                    <span className='font-bold text-3xl'>Todo App</span>
                </div>

                <div className='flex gap-2 items-center'>
                    <div className='flex gap-2'>
                    <Link to={'/'} className='font-lg'>
                            Home
                        </Link>
                        
                        <Link to={'/dashboard'} className='font-lg'>
                            Dashboard
                        </Link>
                    </div>
                    <button
                        onClick={toggleTheme}
                        className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-600"
                    >
                        {darkMode ? <Sun /> : <Moon />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
