//Navigate from page to page

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function Nav({setToken}) {

  const navigate = useNavigate();

    const logout = () => {
      setToken(null);
    };

  return (
    <>
        <ul className='flex'>
          <li className='p-4'> <NavLink to="/">Home</NavLink></li>
          <li className='p-4'> <NavLink to="/employees">Employees</NavLink> </li>
          <li className='p-4'> <NavLink to="/teams">Teams</NavLink> </li>
          <li className='p-4'><input type='button' value="Logout" onClick={logout} className='cursor-pointer' /></li>
        </ul>
    </>
  );
}

export default Nav;
