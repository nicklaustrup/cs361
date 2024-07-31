//Navigate from page to page
import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// define log in button actions




function Login() {
    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/register`; 
        navigate(path);
      }

  return (
    <div className='flex justify-center items-center border rounded-md drop-shadow-md mt-10'>
    <form className='w-full mx-auto py-4' onSubmit={(e) => { e.preventDefault();}}>
        <fieldset className='flex flex-col items-center justify-center'>
            <legend className='drop-shadow-sm font-bold'> Login </legend>
            <label>Email:</label>
            <input type="email" placeholder='Enter Email' className='w-[50%] rounded-md m-1 p-2'/>
            <label>Password:</label>
            <input type="password" placeholder='Enter Password' className='w-[50%] rounded-md m-1 p-2'/>
        </fieldset>
    <button className='bg-slate-500 text-white w-[200px] rounded-md font-medium my-6 mx-1 py-1' >Login</button>
    <button onClick={routeChange} className='bg-slate-200 text-black w-[200px] rounded-md font-medium my-6 mx-1 py-1' >Register</button>
        <div className='flex justify-center'>

        <p className='w-1/5 border border-slate-200 bg-gray-300 rounded-lg p-2 m-3'>Sign up, it only takes a minute!</p>
        </div>
    </form>
    </div>
  );
}

export default Login;
