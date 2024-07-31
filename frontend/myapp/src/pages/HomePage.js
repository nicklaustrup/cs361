import React from 'react'

const HomePage = () => {
    return (
        <div className='flex flex-col pt-5 items-center mx-auto w-1/2 h-[60vh]'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Home</h1>
            <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-xl font-medium border border-slate-200 shadow-sm'>SamePage is a one-stop shop for centralizing your team's communication and disseminating important messages.</p>
            <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-lg border border-slate-200 shadow-sm'>To get started, add your Employees to our database by selecting "Employees" from the navigation bar. From the Employees page, you can view, add, delete, or edit any employee who is currently in the database.</p>
            <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-lg border border-slate-200 shadow-sm'>You can create Teams with any of the employees in the database. From the Teams page, you can create, update, view, or remove teams from the database. Select "Teams" from the navigation bar to get started.</p>
        </div>
    )
}

export default HomePage;