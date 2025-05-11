import './App.css'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import Protected from './components/Protected'

function App() {

  return (
    <>
      <BrowserRouter>
           <Routes>
              <Route path='/' element={<LoginPage/>}/>
              <Route path='/signup' element={<SignUpPage/>}/>
              <Route path='/dashboard' element={
                <Protected>
                  <DashboardPage/>
                </Protected>
              }/>
           </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
