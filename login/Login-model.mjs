// Import dependencies.
import mongoose from './db.mjs';


//Define the schema
const userSchema = mongoose.Schema({
    email:   { type: String, required: true },
    password: { type: String, required: true},
});

/* NAME the MODEL and the COLLECTION */

const User = mongoose.model('Users', userSchema);
/*       A                          B                           C, D

A. MongoDB automatically names the collection based on this variable name
   and it appends 's'. 
C. Force your own name for the collection by listing it in the model().
B. Name of the model, which gets used in the CRUD variables.  
D. The /collectionName will be the route endpoint where data is displayed, 
   so it can be fetched by the frontend.
*/


// CREATE model *****************************************
const createUser = async (email, password) => {
    // Call the constructor to create an instance of the model class User
    const user = new User({
        email: email,
        password: password, 
    });
    return user.save();
}

// RETRIEVE models *****************************************
// Retrieve all documents and return a promise.
const findUsers = async () => {
    const query = User.find();
    return query.exec();
}

const findUserById = async (email) => {
    console.log("email: ", email)
    const query = User.find({email: email});
    return query.exec();
}

// // // UPDATE models *****************************************************
const replaceUser = async (_id, email, password) => {
    const result = await User.replaceOne({ _id: _id }, {
        email: email, 
        password: password, 
    });
    return { 
        _id: _id, 
        email: email, 
        password: password, 
    }
}


// DELETE user based on _id  *****************************************
const deleteById = async (_id) => {
    const result = await User.deleteOne({ _id: _id });
    // Return the count of deleted document. 
    // Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}


// export { createUser, findExercise, findExerciseById, replaceExercise, deleteById }
export { createUser, findUsers, findUserById, replaceUser, deleteById }