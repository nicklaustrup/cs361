// This controller uses REST rather than Express style.
import * as teams from './Teams-model.mjs';

/*
1. Model schema auto names the collection.
2. The Controller /log route/endpoint is a place for the data to display as it is 
   being passed from the backend to the frontend.
3. Contoller's import teamLog creates a name for the model to use in the methods below.
*/



/* BEGIN controllers **************** */

// RETRIEVE team
const teams_get_all = ((req, res) => {
    console.log("API HIT : GET ALL");
    teams.findTeams()
    .then(team => { 
        if (team !== null) {
            console.log(`All teams were retrieved from the collection.`);
            res.status(200).json(team);
        } else {
            res.status(404).json({ Error: 'That team document was not found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(500).json({ Error: 'Your request to retrieve an teams document failed.' });
    });
});

// // RETRIEVE Members of a team
// app.get('/teams/members/:_id', (req, res) => {
//     teams.populateMembers(req.params._id)
//     .then(team => { 
//         if (team !== null) {
//             console.log(`"${team.name}" was retrieved, based on its ID.`);
//             res.status.json(team);
//         } else {
//             res.status(404).json({ Error: 'That team could not be found.' });
//         }         
//      })
//     .catch(error => {
//         console.log(error);
//         res.status(400).json({ Error: 'That team could not be found.' });
//     });

// });


// CREATE Team
const teams_create = ((req, res) => {

    teams.createTeam(
        req.body.name, 
        req.body.members 
    )
        .then(team => {
            console.log(`"${team.name}" was added to the collection.`);
            res.status(201).json(team);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Creation of an team document failed, due to invalid syntax.' });
        });
});

// RETRIEVE team by ID controller
const teams_get_by_id = ((req, res) => {
    teams.findTeamById(req.params.id)
    .then(team => { 
        if (team !== null) {
            console.log(`"${team.name}" was retrieved, based on its ID.`);
            res.json(team);
        } else {
            res.status(404).json({ Error: 'That team could not be found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'That team could not be found.' });
    });

});

// UPDATE team
const teams_put_by_id = ((req, res) => {
     // Notice use of params.id
     teams.replaceTeam(
         req.params.id, 
         req.body.name, 
         req.body.members
        )
        .then(team => {
            console.log(`"${team.name}" was updated.`);
            res.json(team);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your request to replace a document failed due to an input error.' });
        });
});

// DELETE team
 const teams_delete_by_id = ((req, res) => {
    teams.deleteById(req.params.id)
        .then(deletedCount => {
            // delete one.
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} was deleted.`);
                res.status(200).send();
            } else {// or respond with an error that that ID was not found.
                res.status(404).json({ error: 'That document does not exist.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.send({ error: 'Your request to delete by ID failed.' });
        });
});

export { teams_delete_by_id, teams_put_by_id, teams_get_by_id, teams_create, teams_get_all };