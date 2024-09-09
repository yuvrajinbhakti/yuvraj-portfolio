import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
        <header className="header">
<NavLink to="/" className="w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md" >
<p className="blue-gradient_text" >YSN</p>
</NavLink>

        </header>
    </div>
  )
}

export default Navbar
