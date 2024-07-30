// This controller uses REST rather than Express style.
import * as employees from './Employees-model.mjs';


/*
1. Model schema auto names the collection.
2. The Controller /log route/endpoint is a place for the data to display as it is 
   being passed from the backend to the frontend.
3. Contoller's import exerciseLog creates a name for the model to use in the methods below.
*/


/* BEGIN controllers **************** */

// RETRIEVE All Employees
const employees_get_all = (req, res) => {
    console.log("Employees API Hit");
    employees.findEmployees()
    .then(employee => { 
        if (employee !== null) {
            console.log(`All employees were retrieved from the collection.`);
            res.json(employee);
        } else {
            res.status(404).json({ Error: 'That employee document was not found.' });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'Your request to retrieve an exercise document failed.' });
    });
};


// CREATE Employee
const employees_post_create = (req, res) => {
    console.log(req.body)
    employees.createEmployee(
        req.body.firstName,
        req.body.lastName, 
        req.body.phone, 
        req.body.email, 
        req.body.team, 
    )
        .then(employee => {
            console.log(`"${employee.firstName} ${employee.lastName}" was added to the collection.`);
            res.status(201).json(employee);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Creation of an employee document failed, due to invalid syntax.' });
        });
};


// RETRIEVE exercise by ID controller
const employees_get_by_id = (req, res) => {
    employees.findEmployeeById(req.params._id)
    .then(employee => { 
        if (employee !== null) {
            console.log(`"${employee.firstName} ${employee.lastName}" was retrieved, based on their ID.`);
            res.json(employee);
        } else {
            res.status(404).json({ Error: `EmployeeID "${req.body._id}" could not be found.` });
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: 'That employee could not be found.' });
    });

};

// UPDATE employee
 const employees_put_update_by_id = (req, res) => {
     // Notice use of params.id
     employees.replaceEmployee(
         req.params._id, 
         req.body.firstName,
         req.body.lastName,
         req.body.phone,
         req.body.email,
         req.body.team
        )
        .then(employee => {
            console.log(`"${employee.firstName} ${employee.lastName}" was updated.`);
            res.json(employee);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your request to replace a document failed due to an input error.' });
        });
};

// DELETE employee
 const employees_delete_by_id = (req, res) => {
    employees.deleteById(req.params._id)
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
};

export { employees_delete_by_id, employees_put_update_by_id, employees_get_by_id, employees_post_create, employees_get_all  };