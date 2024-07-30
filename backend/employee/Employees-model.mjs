// Import dependencies.
import mongoose from '../db.mjs';


//Define the schema
const employeeSchema = mongoose.Schema({
    firstName:   { type: String, required: true },
    lastName: { type: String, required: true},
    phone:   { type: Number, required: true },
    email: { type: String, required: true},
    team:   { type: String,   required: false}
});

/* NAME the MODEL and the COLLECTION */

const Employee = mongoose.model('Employees', employeeSchema);
/*       A                          B                           C, D

A. MongoDB automatically names the collection based on this variable name
   and it appends 's'. 
C. Force your own name for the collection by listing it in the model().
B. Name of the model, which gets used in the CRUD variables.  
D. The /collectionName will be the route endpoint where data is displayed, 
   so it can be fetched by the frontend.
*/


// CREATE model *****************************************
const createEmployee = async (firstName, lastName, phone, email, team) => {
    // Call the constructor to create an instance of the model class Employee
    const employee = new Employee({
        firstName: firstName,
        lastName: lastName, 
        phone: phone, 
        email: email, 
        team: team
    });
    return employee.save();
}

// RETRIEVE models *****************************************
// Retrieve all documents and return a promise.
const findEmployees = async () => {
    const query = Employee.find();
    return query.exec();
}

const findEmployeeById = async (_id) => {
    const query = Employee.findById(_id);
    return query.exec();
}

// // // UPDATE models *****************************************************
const replaceEmployee = async (_id, firstName, lastName, phone, email, team) => {
    const result = await Employee.replaceOne({ _id: _id }, {
        firstName: firstName, 
        lastName: lastName, 
        phone: phone, 
        email: email, 
        team: team
    });
    return { 
        _id: _id, 
        firstName: firstName, 
        lastName: lastName, 
        phone: phone, 
        email: email, 
        team: team
    }
}


// DELETE employee based on _id  *****************************************
const deleteById = async (_id) => {
    const result = await Employee.deleteOne({ _id: _id });
    // Return the count of deleted document. 
    // Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount;
}


// export { createEmployee, findExercise, findExerciseById, replaceExercise, deleteById }
export { createEmployee, findEmployees, findEmployeeById, replaceEmployee, deleteById }