//Navigate from page to page

import React from 'react';
import { NavLink } from 'react-router-dom';


function Nav() {
  return (
    <>
        <ul className='flex'>
          <li className='p-4'> <NavLink to="/" >Home</NavLink></li>
          <li className='p-4'> <NavLink to="/employees">Employees</NavLink> </li>
          <li className='p-4'> <NavLink to="../teams">Teams</NavLink> </li>
        {/* <NavLink to="/artlog">Art</NavLink>
        <NavLink to="../projects">Gallery</NavLink>
        <NavLink to="../staff">Staff</NavLink>
        <NavLink to="../ordering">Order</NavLink> */}
        </ul>
    </>
  );
}

export default Nav;
