import React from 'react';
import { ReactTyped } from 'react-typed';
import Login from '../components/Login';

function LoginPage() {
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
            <Login />
            </div>
        </div>
    );
}

export default LoginPage;
  