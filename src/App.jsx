import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './Styles/Global.css'
import DashBoardPage from './Component/Dashboard/DashBoardPage'
import StudentPage from './Component/Students/StudentPage'
import TeacherPage from './Component/Teachers/TeacherPage'
import SideBarPage from './Component/SideBar/SideBarPage'

function App() 
{
  return(

    <>
   
    <BrowserRouter>
      <Routes>
       < Route path='/' element={<SideBarPage/>}>
      <Route index path='' element={<DashBoardPage/>}/>
      <Route path='/students' element={<StudentPage/>}/>
      <Route path='/teachers' element={<TeacherPage/>}/>
</Route>
      </Routes>

    </BrowserRouter>
    </>



  )
}

export default App
