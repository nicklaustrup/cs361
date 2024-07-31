import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [team, setTeam] = useState('');

    const navigate = useNavigate();

    const addEmployee = async () => {
        const newEmployee = { firstName, lastName, phone, email, team };

        const response = await fetch('/employees', {
            method: 'POST',
            body: JSON.stringify(newEmployee),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert("You successfully added an employee to the database.");
        } else {
            alert(`Failed to add employee, due to missing data: (status code = ${response.status}).`);
        }
        navigate("/employees");
    };

    return (
        <div className='flex flex-col items-center mx-auto w-1/2'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Add New Employee</h1>
            <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-xl font-medium border border-slate-200 shadow-sm'>Add a new employee by filling in the form below. All fields are required except the Teams field which can be filled in from the "Teams" page. When you're finished, click the "Submit" button or click "Cancel" to return to the Employees page.</p>

            <div className='w-full flex flex-col gap-5'>
                <label for="firstName">First Name
                    <input id="firstName" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='First Name' name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                </label>
                <label for="lastName" className=''>Last Name
                    <input id="lastName" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='Last Name' name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required></input>
                </label>
                <label for="empPhone" className=''>Phone Number
                    <input id="empPhone" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="number" placeholder='Phone Number' name="phone" value={phone} onChange={e => setPhone(e.target.value)} required></input>
                </label>
                <label for="empEmail" className=''> Email
                    <input id="empEmail" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='Email' name="email" value={email} onChange={e => setEmail(e.target.value)} required></input>
                </label>
                <label for="team" className=''>Team
                    <input id="team" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='Team' name="team" value={team} onChange={e => setTeam(e.target.value)}></input>
                </label>
                <div className='flex'>
                    <button className='m-2 p-2 rounded-md shadow-lg bg-blue-300 w-2/4' onClick={addEmployee}>Submit</button>
                    <button className='m-2 p-2 rounded-md shadow-lg bg-gray-400 w-2/4' onClick={() => navigate("/employees")}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;