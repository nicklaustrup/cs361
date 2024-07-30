import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Confirmation from '../components/Confirmation';
import TeamsTable from '../components/TeamsTable';


const Teams = ({ setTeam }) => {

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
    <div className='flex flex-col justify-center mx-auto w-1/2'>
    <h2 className='text-4xl font-bold text-slate-500 py-4 mx-auto'>Teams</h2>

    <section className='h-[1%]'>
        <article className='mx-auto mt-5'>
          <TeamsTable 
            teams={teams}
            confirmDelete={confirmDelete}
            onEdit={onEditTeam}
            />
        {open && <Confirmation onConfirm={onDeleteTeam} open={open} setOpen={setOpen}/>}
        </article>
    </section>
</div>
  )
}

export default Teams;