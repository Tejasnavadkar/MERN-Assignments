import './App.css'
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import DashboardPage from './pages/DashboardPage'
import Protected from './components/Protected'
import CreateTaskPage from './pages/CreateTaskPage'
import CreateBoardPage from './pages/CreateBoardPage'
import CreateListPage from './pages/CreateListPage'
import AddMemberPage from './pages/AddMemberPage'

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
              <Route path='/createTask/:listId' element={
                <Protected>
                  <CreateTaskPage/>
                </Protected>
              }/>

               <Route path='/updateTask/:taskId' element={
                <Protected>
                  <CreateTaskPage/>
                </Protected>
              }/>

              <Route path='/createBoard' element={
                <Protected>
                  <CreateBoardPage/>
                </Protected>
              } />

              <Route path='/createList/:boardId' element={
                <Protected>
                  <CreateListPage/>
                </Protected>
              } />

              <Route path='/addMember/:boardId' element={
                <Protected>
                  <AddMemberPage/>
                </Protected>
              } />
           </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
