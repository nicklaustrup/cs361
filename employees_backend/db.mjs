// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';


// Connect based on the .env file parameters.

// Connect based on the .env file parameters.
mongoose.connect(
  process.env.MONGODB_CONNECT_STRING,
  { useNewUrlParser: true }
);


// Confirm that the database has connected and print a message in the console.
mongoose.connection.once("open", (err) => {
  if(err){
      res.status(500).json({ error: 'Failed to connect to the database' });
  } else  {
      console.log('Successfully connected to the database.');
  }
});

export default mongoose;