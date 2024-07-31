import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'


import HomePage from './pages/HomePage.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Register from './pages/Register.js';
import Employees from './pages/Employees.js';
import EditEmployee from './pages/EditEmployee.js';
import AddEmployee from './pages/AddEmployee.js';
import Teams from './pages/Teams.js';
import AddTeam from './pages/AddTeam.js';
import EditTeam from './pages/EditTeam.js';

// Import pages here

function App() {
  const [employee, setEmployee] = useState([]);
  const [team, setTeam] = useState([]);
  const [employees, setEmployees] = useState([]);

  return (
    <div className="App min-h-fit">
      <BrowserRouter>

        <Header />


      <main>
        <section>
          <Routes>
            <Route path="/" exact element={<HomePage />} /> 
            <Route path="/register" exact element={<Register />} />
            <Route path="/employees" exact element={<Employees setEmployee={setEmployee}/>} />
            <Route path="/edit-employee" exact element={<EditEmployee employee={employee} />} /> 
            <Route path='/add-employee' exact element={<AddEmployee />} />
            <Route path='/teams' exact element={<Teams setEmployees={setEmployees} setTeam={setTeam} />} />
            <Route path='/add-team' exact element={<AddTeam />} />
            <Route path='/edit-team' exact element={<EditTeam employees={employees} team={team} />} />

          </Routes>
        </section>
      </main>


      <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
