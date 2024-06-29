"use client"
import React from 'react'
import Link from 'next/link'
import { useState } from 'react'



const Navbar = () => {
  const [selected, setselected] = useState("client")
const handleSelectChange = (value) => {
  setselected(value);
}
  return (
<nav className='bg-[#00091d] text-gray-300 flex items-center justify-between h-16'>
    <div className="logo size-12 ml-4 flex items-center cursor-pointer"><img className='' src="./JUDICIALJURYLOGO.png" alt="JuryJunction" /></div>
     <ul className='flex gap-8 items-center mr-4 cursor-pointer'>
      <li>Home</li>
      <li>About Us</li>
      <li>Contact</li>
      <li><select name="Switch" id="Switch" className='text-black' onChange={(e) => handleSelectChange(e.target.value)}>
        <option value="client">Client</option>
        <option value="advocate">Advoacte</option>
        </select></li>
      <li> 
<Link href={selected === "client" ? "./client/register" : "./Advocate/register"}>
         <button
        class="select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Register
      </button>
      </Link>
      </li>
      <li> 
        <Link  href={selected === "client" ? "./client/login" : "./Advocate/login"}>
         <button
        class="select-none rounded-lg bg-gray-900 py-2 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none  active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        Login
      </button></Link>
      </li>
     </ul>
      </nav>
  )
}

export default Navbar
