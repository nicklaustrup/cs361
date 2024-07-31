import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AddTeam = () => {

    const [name, setName] = useState('');
    const [members, setMembers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    const addTeam = async () => {
        const newTeam = { name, members };
    try {
        const response = await fetch(`/teams`, {
            method: 'POST',
            body: JSON.stringify(newTeam),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert(`You successfully added ${name} to the database.`);
        } else {
            alert(`Error adding Team! (status code = ${response.status}).`);
        }
    } catch(error){
        alert(error);
    }
        navigate("/teams");
    };

    // RETRIEVE the list of employees
    const loadEmployees = async () => {
        const response = await fetch(`/employees`);
        const employees = await response.json();
        setEmployees(employees);
    }

    useEffect(() => {
        loadEmployees();
    }, []);


    return (
        <div className='flex flex-col justify-center mx-auto w-1/2'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Add New Team</h1>

            <p className='w-full my-5 p-2 bg-slate-100 rounded-lg'>Create a new team assign a member. Member list is generated from all employees who have been added to the database. When finished, click the "Submit" button or "Cancel" to return to the previous page.</p>

            <div className='w-full flex flex-col gap-5'>

                <label for="teamName">Name
                    <input id="teamName" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='Team Name' name="name" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label for="members" className=''>Members</label>
                <select id="members" name="members" onChange={(e) => setMembers(e.target.value)}>
                    {employees.map((employee) =>
                    <option value={employee._id}>{employee.firstName} {employee.lastName}</option>
                    )} 
                </select>
                <div className='flex'>
                    <button className='m-2 p-2 rounded-md shadow-lg bg-blue-300 w-2/4' onClick={addTeam}>Submit</button>
                    <button className='m-2 p-2 rounded-md shadow-lg bg-gray-400 w-2/4' onClick={() => navigate('/teams')}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddTeam;