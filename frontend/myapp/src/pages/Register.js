import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='container mx-auto py-6'>
        <div className='container my-20 py-10 max-w-fit mx-auto border rounded-xl border-gray-400 shadow-lg px-5'>
        <form action="#" method="POST" className='max-w-full mx-auto'>
            <legend className='font-bold text-4xl text-center mb-4'>Register</legend>
            <p className='mb-4'>Create your own account. It's free and only takes a minute.</p>
            <div className='grid grid-cols-2 gap-5'>
                <input required type="text" placeholder='First Name' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2'/>
                <input required type="text" placeholder='Last Name' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2'/>
            </div>
            <div className='mt-5'>
                <input required type="text" placeholder='Phone Number' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full'/>
            </div>
            <div className='mt-5'>
                <input required type="text" placeholder='Email' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full'/>
            </div>
            <div className='mt-5'>
                <input required type="password" placeholder='Password' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full'/>
            </div>
            <div className='mt-5'>
                <input required type="password" placeholder='Confirm Password' autoComplete="off" className='rounded-lg border border-gray-400 py-1 px-2 w-full'/>
            </div>
            <div className='mt-5'>
                <button className='text-white py-2 px-2 rounded-md bg-blue-400 w-full hover:bg-blue-700'>Sign Up</button>
            </div>
        </form>
        <div className='mt-5'>
        <p>Already registered?</p>
        <Link className="text-blue-400 underline" to="/">Sign In</Link>
        </div>
        </div>
    </div>
  )
}

export default Register;