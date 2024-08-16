import express from 'express';
import cors from 'cors';
import loginRoutes from './login-routes.mjs'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoutes);


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Login is running on port ${port}`);
});