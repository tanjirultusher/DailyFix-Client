import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';


const Root = () => {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Outlet />
        </main>
    </div>
  )
}

export default Root;
