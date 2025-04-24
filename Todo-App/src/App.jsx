import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Dashboard from './components/Dashboard'
import DashboardPage from './pages/DashboardPage'

function App() {

  return (
    <>
     <BrowserRouter>
    
     <Routes>
       <Route path='/' element={<HomePage/>} />
       <Route path='/dashboard' element={<DashboardPage/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
