import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import default_group from "../images/default_group.png"




const TeamsTable = ({ teams, confirmDelete, onEdit }) => {


    const navigate = useNavigate();

    const addNewTeam = () => {
      navigate('/add-team');
    };
  
  //   // RETRIEVE the list of employees
  //   const loadEmployees = async () => {
  //     const response = await fetch(`${employeesAPI}`);
  //     const employees = await response.json();
  //     setEmployees(employees);
  // }

  //   useEffect(() => {
  //       loadEmployees();
  //   }, []);

    
  return (
    <>
    <button className='border border-gray-300 shadow-sm rounded-md px-2 py-1 bg-blue-200' onClick={addNewTeam}>Add New Team</button>

    <ul role="list" className="divide-y divide-gray-100">
      {teams.map((team) => (
        <li key={team._id} className="flex justify-between gap-x-6 py-5">

          <div className="flex min-w-fit gap-x-4">
            <img alt='' src={default_group} className="h-12 w-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-md font-semibold leading-6 text-gray-900"></p>
              <h3 className='text-gray-500 text-sm'>Team</h3>
            <p className="text-sm leading-6 text-gray-700 font-semibold self-center">{team.name}</p>
            </div>
          </div>
          <div className='w-full pl-5 flex'>
          <h3 className='text-gray-500 text-md mx-3'>Members</h3>
          <div className='inline-block m-3'>
            {team.members.map((member)=>
                <p className="mt-1  text-md leading-5 text-gray-700">{member.firstName} {member.lastName}</p>
          )}
          
          </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <div className="mt-1 flex items-center gap-x-1.5">
              <p className="text-xs leading-5 text-gray-500 hover:cursor-pointer" onClick={() => onEdit(team)}><FaRegEdit className='size-5' title='Edit' /></p>
              <p onClick={() => confirmDelete(team)} className="text-xs leading-5 text-gray-500 hover:cursor-pointer"><MdDeleteForever className='size-6' title='Delete' /></p>
            </div>

          </div>
        </li>
      ))}
    </ul>
</>
  )
}

export default TeamsTable