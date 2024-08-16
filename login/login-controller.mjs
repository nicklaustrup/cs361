// This controller uses REST rather than Express style.
import * as users from './Login-model.mjs';


/*
1. Model schema auto names the collection.
2. The Controller /log route/endpoint is a place for the data to display as it is 
   being passed from the backend to the frontend.
3. Contoller's import exerciseLog creates a name for the model to use in the methods below.
*/


/* BEGIN controllers **************** */

// RETRIEVE All Users
const users_get_all = (req, res) => {
    users.findUsers()
        .then(user => {
            if (user !== null) {
                console.log(`All users were retrieved from the collection.`);
                res.json(user);
            } else {
                res.status(404).json({ Error: 'That user document was not found.' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your request to retrieve an exercise document failed.' });
        });
};


// CREATE User
const users_post_register = async (req, res) => {
    console.log("create user hit")

    const newEmployee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email
    };

    const response = await fetch('http://localhost:3006/employees', {
        method: 'POST',
        body: JSON.stringify(newEmployee),
        headers: {
            'Content-Type': 'application/json',
        },
    });


    if (response.status === 201) {
        console.log("You successfully added an employee to the database.");
        users.createUser(
            req.body.email,
            req.body.password
        )
            .then(user => {
                console.log(`"${user.email}" was added to the collection.`);
                res.status(201).json(user);
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({ Error: 'Creation of an user document failed, due to invalid syntax.' });
            });
    } else {
        res.status(500).json({ error: `Failed to add employee, due to missing data: (status code = ${response.status}).` });
    }

};


// RETRIEVE exercise by ID controller
const users_get_by_email = (req, res) => {
    const { email, password } = req.body;
    console.log("Login API hit")

    users.findUserById(email)
        .then(user => {
            console.log("user: ", user)
            if (user !== null && user[0].email === email && password === user[0].password) {
                console.log(`"${user[0].email}" was retrieved, based on their ID.`);
                res.send({ token: true, success: "Successfully logged in!" });
            } else {
                console.log(`Failed to validate user.`)
                res.status(404).json({ token: false, error: `Email "${email}" could not be found.` });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ token: false, error: 'That user could not be found.' });
        });
};

// Async function to retrieve and replace user data
async function getAndReplaceUser(memberId) {
    try {
        const user = await users.findUserById(memberId);
        if (user) {
            console.log(`"${user.firstName} ${user.lastName}" was retrieved, based on their ID.`);
            return user;
        } else {
            // Handle the case where the user is not found
            console.log(`User with ID ${memberId} was not found.`);
            return null; // or an appropriate placeholder object
        }
    } catch (error) {
        console.log(error);
        throw new Error('That user could not be found.');
    }
}

// RETRIEVE group of users by ID controller
const users_post_group_id = async (req, res) => {
    try {
        console.log("Request body: ", req.body);
        const filled_teams = await Promise.all(req.body.map(async team => ({
            ...team,
            members: await Promise.all(team.members.map(memberId => getAndReplaceUser(memberId)))
        })));

        console.log("fetched teams: ", JSON.stringify(filled_teams, null, 2));
        res.json(filled_teams);
    } catch (error) {
        console.error(error);
        res.status(404).json({ Error: `UserID "${req.body._id}" could not be found.` });
    }
};

// UPDATE user
const users_put_update_by_id = (req, res) => {
    // Notice use of params.id
    users.replaceUser(
        req.params._id,
        req.body.firstName,
        req.body.lastName,
        req.body.phone,
        req.body.email,
        req.body.team
    )
        .then(user => {
            console.log(`"${user.firstName} ${user.lastName}" was updated.`);
            res.json(user);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: 'Your request to replace a document failed due to an input error.' });
        });
};

// DELETE user
const users_delete_by_id = (req, res) => {
    users.deleteById(req.params._id)
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

export { users_delete_by_id, users_put_update_by_id, users_get_by_email, users_post_register, users_get_all, users_post_group_id };