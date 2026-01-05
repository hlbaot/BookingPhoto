'use client'

import React from 'react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import '@/styles/navbar.scss'

const Navbar: React.FC = () => {
  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/login'
  }

  return (
    <div className="navbar">
      {/* Tiêu đề */}
      <div className="w-full bg-black m-2 rounded-[30px]">
        <h1 className="p-2 text-[23px] text-center text-white font-bold">
          Menu Admin
        </h1>
      </div>

      {/* Menu */}
      <ul className="flex flex-col ">
        <li>
          <Link href="/managerHome" className="block ">
            Home
          </Link>
        </li>
        <li>
          <Link href="/managerClient" className="block ">
            Client
          </Link>
        </li>
        <li>
          <Link href="/managerService" className="block ">
            Service
          </Link>
        </li>
        <li>
          <Link href="/managerFeedback" className="block ">
            Feedback
          </Link>
        </li>
      </ul>

      {/* Logout */}
      <div
        onClick={handleLogout}
        className="px-6 py-2 mt-4 bg-red-600 m-2 rounded-[30px] hover:cursor-pointer hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-right-from-bracket text-white"></i>
        <span className="text-white">Logout</span>
      </div>
    </div>
  )
}

export default Navbar
