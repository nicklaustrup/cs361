import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import default_image from "../images/default_profile.png"



function EmployeeTable({ employees, confirmDelete, onEdit }) {

  const navigate = useNavigate();

  const addNewEmployee = () => {
    navigate('/add-employee');
  };

  

  return (
    <div className='w-full'>
          <button className='border border-gray-300 shadow-sm rounded-md px-2 py-1 bg-blue-200 self-start' onClick={addNewEmployee}>Add New Employee</button>

          <ul role="list" className="divide-y divide-gray-100">
            {employees.map((person) => (
              <li key={person.email} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-fit gap-x-4 truncate text-ellipsis">
                  <img alt='' src={default_image} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-md font-semibold leading-6 text-gray-900">{person.firstName} {person.lastName}</p>
                    <h3 className='text-gray-500 text-sm'>Team</h3>
                  <p className="text-sm leading-6 text-gray-700 font-semibold self-center">{person.team ? person.team : "Unassigned"}</p>
                  </div>
                </div>
                <div className='w-full pl-1 flex'>
                <h3 className='text-gray-500 text-md self-center mx-3'>Contact</h3>
                <div className='inline-block m-3'>
                <p className="mt-1  text-md leading-5 text-gray-500">{person.email}</p>
                <p className="mt-1  text-md leading-5 text-gray-500">{person.phone}</p>
                </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500 hover:cursor-pointer" onClick={() => onEdit(person)}><FaRegEdit className='size-5' title='Edit' /></p>
                    <p onClick={() => confirmDelete(person)} className="text-xs leading-5 text-gray-500 hover:cursor-pointer"><MdDeleteForever className='size-6' title='Delete' /></p>
                  </div>

                </div>
              </li>
            ))}
          </ul>
</div>
  )
}

export default EmployeeTable;