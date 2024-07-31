import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confirmation from '../components/Confirmation';
import TeamsTable from '../components/TeamsTable';


const Teams = ({ setTeam, setEmployees }) => {

      // use state to bring in the data
      const [teams, setTeams] = useState([]);
      const [open, setOpen] = useState(false);
      const [deleteTeam, setDeleteTeam] = useState([]);

      const navigate = useNavigate();


    // RETRIEVE the list of teams
    const loadTeams = async () => {
      const response = await fetch(`/teams`);
      const teams = await response.json();
      setTeams(teams);
      setEmployees();
  }  

      // DELETE a single team
    const onDeleteTeam = async () => {
      setOpen(false);
      const response = await fetch(`/teams/${deleteTeam._id}`, { method: 'DELETE' });
      if (response.status === 200) {
          const getResponse = await fetch('/teams');
          const getTeams = await getResponse.json();
          setTeams(getTeams);
      } else {
          console.error(`The row for id:${deleteTeam._id} failed to delete due to (status code = ${response.status}).`)
      }
  }
    const confirmDelete = (deleteTeam) => {
      setDeleteTeam(deleteTeam);
      setOpen(true);
    }
  
      // UPDATE a single exercise
      const onEditTeam = (team) => {
        setTeam(team);
        navigate("/edit-team");
    }


    useEffect(() => {
      loadTeams();
  }, []);


  return (
    <div className='flex flex-col pt-5 items-center mx-auto w-1/2 h-[60vh]'>
    <h2 className='text-4xl font-bold text-slate-500 py-4 mx-auto w-fit'>Teams</h2>
        <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-xl font-medium border border-slate-200 shadow-sm'>
        View, edit, and delete all teams currently in the database. Add a new team by clicking on the "Add New Team" button.</p>

          <TeamsTable 
            teams={teams}
            confirmDelete={confirmDelete}
            onEdit={onEditTeam}
            />
        {open && <Confirmation onConfirm={onDeleteTeam} open={open} setOpen={setOpen}/>}
</div>
  )
}

export default Teams;