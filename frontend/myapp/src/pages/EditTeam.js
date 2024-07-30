import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function EditTeam({ team }) {
    const [name, setName] = useState(team.name);
    const [newMembers, setNewMembers] = useState(team.members);

    const navigate = useNavigate();

    const editTeam = async () => {
        // const updateEmployee = { firstName, lastName, phone, email, team };

        const response = await fetch(`/teams/${team._id}`, {
            method: 'put',
            body: JSON.stringify({
                name: name,
                members: newMembers
            }),
            headers: {
                'Content-Type': 'application/json',
            },

        });

        if (response.status === 200) {
            alert(`You successfully edited ${name}.`);
        } else {
            const errMessage = await response.json();
            alert(`Updating team failed due to status ${response.status}. ${errMessage.Error}`);
        }
        navigate('/teams');
    };

    const cancelEdit = () => {
        navigate('/teams');
    }

    const newTeamSlot = () => {
        const myElement = document.getElementById("newTeamSlot");
        myElement.innerHTML = `
        <p>New Members</p>
        <select>
            <option> Hi </option>
        </select>
        `
    }


    return (
        <div className='flex flex-col justify-center mx-auto w-1/2'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Edit Team</h1>

            <section className='h-[1%]'>
                <article className='mx-auto mt-5'>
                    <div className='w-full flex flex-col gap-5'>
                        <label htmlFor="name">Team
                            <input id="name" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full" type="text" placeholder='First Name' name="firstName" value={team.name} onChange={e => setName(e.target.value)} required />
                        </label>
                        <label htmlFor="editMembers" className=''>Members</label>
                        <button className='bg-blue-200 w-fit p-2 rounded-lg shadow-md self-start' onClick={newTeamSlot}>Add New Members</button>
                        <div >
                        {team.members.map((member) => 
                            <p className='p-2 bg-gray-100 rounded-md border border-slate-300' value={member._id} onChange={e => setNewMembers(e.target.value)}> {member.firstName} {member.lastName} </p>
                        )}
                        <p id="newTeamSlot"></p>
                        </div>
                    </div>
                    <div className='flex mt-10'>
                        <button className='m-2 p-2 rounded-md shadow-lg bg-blue-300 w-2/4' onClick={editTeam}>Submit</button>
                        <button className='m-2 p-2 rounded-md shadow-lg bg-gray-400 w-2/4' onClick={cancelEdit}>Cancel</button>
                    </div>
                </article>
            </section>
        </div>

    )
}

export default EditTeam;