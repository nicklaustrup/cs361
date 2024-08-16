import express from 'express';
import cors from 'cors';
// import employeeRoutes from './employee/employee-routes.mjs';
import teamRoutes from './teams/team-routes.mjs';

const app = express();

app.use(express.json());
app.use(cors());



// Use routes
// app.use('/employees', employeeRoutes);
app.use('/teams', teamRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Teams is running on port ${process.env.PORT}`);
});