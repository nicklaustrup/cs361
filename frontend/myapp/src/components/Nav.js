//Navigate from page to page

import React from 'react';
import { NavLink } from 'react-router-dom';


function Nav() {


  return (
    <>
        <ul className='flex'>
          <li className='p-4'> <NavLink to="/" activeClassName="navbar__link--active" className="navbar__link">Home</NavLink></li>
          <li className='p-4'> <NavLink to="/employees" activeClassName="navbar__link--active" className="navbar__link">Employees</NavLink> </li>
          <li className='p-4'> <NavLink to="/teams" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>Teams</NavLink> </li>
        {/* <NavLink to="/artlog">Art</NavLink>
        <NavLink to="../projects">Gallery</NavLink>
        <NavLink to="../staff">Staff</NavLink>
        <NavLink to="../ordering">Order</NavLink> */}
        </ul>
    </>
  );
}

export default Nav;
