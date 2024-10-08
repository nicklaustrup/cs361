import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'


import LoginPage from './pages/LoginPage.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Employees from './pages/Employees.js';
import EditEmployee from './pages/EditEmployee.js';
import AddEmployee from './pages/AddEmployee.js';
import Teams from './pages/Teams.js';
import AddTeam from './pages/AddTeam.js';
import EditTeam from './pages/EditTeam.js';
import HomePage from './pages/HomePage.js';
import UnlogHeader from './components/UnlogHeader.js';
import useToken from './useToken.js';

// Import pages here


function App() {

  const { token, setToken } = useToken();

  const [employee, setEmployee] = useState([]);
  const [team, setTeam] = useState([]);
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    // localStorage.setItem('token', false);
    setToken(null);
  }, []);

  if (!token) {
    return (
      <>
        <UnlogHeader />
        <LoginPage setToken={setToken} />
      </>
    )
  }

  return (
    <div className="App min-h-fit">
      <BrowserRouter>

        <Header setToken={setToken} />
        <main>
          <section>
            <Routes>

              <Route path="/" exact element={<HomePage />} />
              <Route path="/employees" exact element={<Employees setEmployee={setEmployee} />} />
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
