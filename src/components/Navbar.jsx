import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='  tracking-wider text-2xl mt-5 flex flex-row gap-4 place-content-evenly'>
    <NavLink to="/">
        
        Home
    </NavLink>

    <NavLink to="/pastes">
        Pastes
    </NavLink>
    </div>
  )
}
