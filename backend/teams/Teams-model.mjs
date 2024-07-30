import mongoose from '../db.mjs';



//Define the schema
const teamsSchema = mongoose.Schema({
    name:   { type: String, required: true, unique: true },
    members: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Employees'}
    ]
});


/* NAME the MODEL and the COLLECTION */
const Team = mongoose.model('Teams', teamsSchema);
/*       A                          B                           C, D



A. MongoDB automatically names the collection based on this variable name
   and it appends 's'. 
C. Force your own name for the collection by listing it in the model().
B. Name of the model, which gets used in the CRUD variables.  
D. The /collectionName will be the route endpoint where data is displayed, 
   so it can be fetched by the frontend.
*/


// CREATE model *****************************************
const createTeam = async (name, members) => {
    // Call the constructor to create an instance of the model class Team
    const team = new Team({
        name: name, 
        members: members
    });
    return team.save();
}

// RETRIEVE models *****************************************
// Retrieve all documents and return a promise.
const findTeams = async () => {
    const query = Team.find({})
    .populate('members');
    return query.exec();
}


// Retrieve a Team based on its ID
const findTeamById = async (_id) => {
    const query = Team.findById(_id)
    .populate('members');
    return query.exec();
}

// UPDATE models *****************************************************
const replaceTeam = async (_id, name, members) => {
    const result = await Team.replaceOne({ _id: _id }, {
        name: name, 
        members: members
    });
    return { 
        _id: _id, 
        name: name, 
        members: members 
    }
}

// DELETE exercise based on _id  *****************************************
const deleteById = async (_id) => {
    const result = await Team.deleteOne({ _id: _id });
    // Return the count of deleted document. 
    // Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}




export { createTeam, findTeams, findTeamById, replaceTeam, deleteById} //populateMembers