import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import EmployeeList from './pages/EmployeeList'
import CreateEmployee from './pages/CreateEmployee'
import OnePageCrud from './pages/OnePageCrud'
import TaskLis from './pages/TaskLis'
import CreateTask from './pages/CreateTask'


function App() {

  return (
    <BrowserRouter>
      <Header />
      <main className="container flex-grow-1">
        <Routes>
          <Route path='/'  element={<EmployeeList />} />
          <Route path='/add-employee' element={<CreateEmployee />}/>
          <Route path='/edit-employee/:id' element={<CreateEmployee />} />
          <Route path='/crud' element={< OnePageCrud />} />
          <Route path='/task-list' element={<TaskLis />} />
          <Route path='/add-task' element={< CreateTask/>} />
          <Route path='/edit-task/:id' element={< CreateTask/>} />
        </Routes>

      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
