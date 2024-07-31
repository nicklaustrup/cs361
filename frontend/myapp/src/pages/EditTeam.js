import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


function EditTeam({ team }) {

    // RETRIEVE the list of employees
    const loadEmployees = async () => {
        const response = await fetch(`/employees`);
        const employees = await response.json();
        setEmployees(employees);
    }

    useEffect(() => {
        loadEmployees();
    }, []);


    const [name, setName] = useState(team.name);
    const [newMembers, setNewMembers] = useState(team.members);
    console.log("newMembers: ", newMembers);
    const [employees, setEmployees] = useState([]);


    const navigate = useNavigate();

    const editTeam = async (e) => {
        e.preventDefault();
        console.log("EditTeams newMembers: ", newMembers);
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


    const newTeamSlot = (e) => {
        e.preventDefault()
        // Extract the IDs from the members array
        const memberIds = newMembers ? newMembers.map(member => member._id) : [];
        let availableList = memberIds ? employees.filter(emp => !memberIds.includes(emp._id)) : employees;
        let hideInstructions = document.getElementById('no-team-instr');
        if (hideInstructions){
            hideInstructions.style = 'display: none';
        };
        let myElement = document.getElementById("newTeamSlot");
        myElement.style.display = 'flex';
        let newSelect = document.createElement('select');
        let container = document.createElement('div');
        container.className = 'w-full flex flex-row gap-3';
        let btn = document.createElement('button');
        btn.className = 'w-max-2/4 bg-slate-400 text-white p-2 rounded-lg mx-auto';
        btn.textContent = 'Remove';
        newSelect.className = 'border border-gray-100 gap-2 p-2 bg-slate-100 rounded-lg w-3/4';
        newSelect.onchange = function (e) {
            onNewEmployee(e.target.value);
        };
        myElement.appendChild(container);
        container.appendChild(newSelect);
        container.appendChild(btn);

        availableList.forEach((item) => {
            let newOption = document.createElement('option');
            newOption.value = item._id;
            let name = [item.firstName, item.lastName]
            newOption.text = name.join(' ');
            newSelect.appendChild(newOption);
            console.log("NewTeamSlot Option: ", newOption)
        })


    }



    const onNewEmployee = (_id) => {
        setNewMembers([ ...newMembers, _id ]);
    }


    return (
        <div className='flex flex-col mx-auto w-1/2 items-center'>
            <h1 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Edit Team</h1>

            <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-xl font-medium border border-slate-200 shadow-sm'>Edit your team name and add new members. Adding members will pull a list of employees from the database who are not currently assigned to this team.</p>
            <form onSubmit={editTeam} className='w-full flex flex-col gap-5 border border-gray-100 p-2 rounded-lg'>
                <label htmlFor="teamName" className='text-lg'>Team</label>
                <input id="teamName" className="bg-gray-100 p-2 rounded-lg shadow-sm w-full border border-slate-300" type="text" placeholder='Team Name' name="name" value={name} onChange={e => setName(e.target.value)} required/>

                <label htmlFor="editMembers" className='text-lg'>Members</label>
                <input type="button" className='bg-blue-200 w-fit p-2 rounded-lg shadow-md self-start' onClick={newTeamSlot} value="Add New Employees" />

                {team.members ? (team.members.map((member) =>
                    <p key={member._id} className='p-2 bg-gray-100 rounded-md border border-slate-300' value={member._id}> {member.firstName} {member.lastName} </p>
                )) : (<p id="no-team-instr" >Click "Add New Members" button to get started</p>)}
                <div>
                    <p className="w-full flex-col gap-2" style={{ display: "none" }} id="newTeamSlot">Add New Members</p>
                </div>

            <div className='flex mt-10 w-full'>
                <button type='submit' className='m-2 p-2 rounded-md shadow-lg bg-blue-300 w-2/4'>Submit</button>
                <button className='m-2 p-2 rounded-md shadow-lg bg-gray-400 w-2/4' onClick={() => navigate('/teams')}>Cancel</button>
            </div>
            </form>
        </div>

    )
}

export default EditTeam;