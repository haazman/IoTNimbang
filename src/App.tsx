import { useState } from 'react'
import Sidebar from './components/sidebar'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Condition from './pages/condition'
import Table from './pages/table'

function App() {

  return (
    <>
      <div>
        <Sidebar />
        <BrowserRouter basename="/">
          
        </BrowserRouter>
        <BrowserRouter basename="/condition">
          <div className='flex justify-center'>
            <Condition/>
          </div>
        </BrowserRouter>
        <BrowserRouter basename="/table">
          <div className='ml-[500px]'>
            <Table/>
          </div>
        </BrowserRouter>
        <BrowserRouter basename="/stats">
          <div className='flex justify-center'>
            stats
          </div>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
