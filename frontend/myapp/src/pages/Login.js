//Navigate from page to page
// import { GoogleLogin } from '@react-oauth/google';
import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';

// import { jwtDecode } from 'jwt-decode';

// define log in button actions

async function loginUser(credentials) {
  return fetch('http://localhost:3007/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}



function Login({ setToken, changePage }) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    // console.log("login token: ", token);
    if (token.error){
      alert(token.error);
    }
    if (token.success){
      alert(token.success);
    }

    setToken(token);
  }

  return (

    <div className='min-h-fit'>
      <div className='max-w-[800px] mt-[5%] w-full pb-10 mx-auto text-center flex flex-col justify-center'>
        <h1 className='text-3xl font-bold text-slate-500'>Same Page App</h1>

        <div className='text-4xl font-bold p-2 flex justify-center items-center'>

          <p className='text-4xl'>Keep your team</p>
          <ReactTyped className='pl-2 font-bold text-4xl text-slate-500' strings={['synced.', 'connected.', 'alert.', 'on the Same Page.']} typeSpeed={100} backSpeed={80} loop />

        </div>

        <p className='font-bold text-gray-500'>Manage your team's communications all in one place.</p>
        <p className='font-bold text-gray-500'>Disseminate critical alerts from your dashboard.</p>
        <div className='flex justify-center items-center border rounded-md drop-shadow-md mt-10'>
          <form className='w-full mx-auto py-4' onSubmit={handleSubmit}>
            <fieldset className='flex flex-col items-center justify-center'>
              <legend className='drop-shadow-sm font-bold'> Login </legend>
              <label>Email:</label>
              <input type="email" placeholder='Enter Email' className='w-[50%] rounded-md m-1 p-2' onChange={(e) => setEmail(e.target.value)} />
              <label>Password:</label>
              <input type="password" placeholder='Enter Password' className='w-[50%] rounded-md m-1 p-2' onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
            <div className='flex flex-row gap-3 justify-center'>
              <button className='bg-slate-500 text-white w-[25%] rounded-md font-medium my-6 mx-1 py-1' >Login</button>
              <a onClick={() => changePage()} className='button bg-slate-200 text-black w-[25%] rounded-md font-medium my-6 mx-1 py-1 cursor-pointer' >Register</a>
            </div>
            <div className='flex justify-center'>

              <p className='w-1/5 border border-slate-200 bg-gray-300 rounded-lg p-2 m-3'>Sign up, it only takes a minute!</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default Login;
