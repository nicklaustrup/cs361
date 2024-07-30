import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EditEmployee({ employee }) {
    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [phone, setPhone] = useState(employee.phone);
    const [email, setEmail] = useState(employee.email);
    const [team, setTeam] = useState(employee.team);

    const navigate = useNavigate();

    const editEmployee = async () => {
        // const updateEmployee = { firstName, lastName, phone, email, team };

        const response = await fetch(`/employees/${employee._id}`, {
            method: 'put',
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                team: team
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (response.status === 200) {
            alert(`You successfully edited ${firstName} ${lastName}.`);
        } else {
            const errMessage = await response.json();
            alert(`Updating employee failed due to status ${response.status}. ${errMessage.Error}`);
        }
        navigate('/employees');
    };

    const cancelEdit = () => {
        navigate('/employees');
    }


    return (
        <div className='flex flex-col justify-center mx-auto w-1/2'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Edit Employee</h1>

            <section className='h-[1%]'>
                <article className='mx-auto mt-5'>
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
                    </div>
                    <div className='flex'>
                        <button className='m-2 p-2 rounded-md shadow-lg bg-blue-300 w-2/4' onClick={editEmployee}>Submit</button>
                        <button className='m-2 p-2 rounded-md shadow-lg bg-gray-400 w-2/4' onClick={cancelEdit}>Cancel</button>
                    </div>
                </article>
            </section>
        </div>

    )
}

export default EditEmployee;