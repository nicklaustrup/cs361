import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable';
import Confirmation from '../components/Confirmation';

function Employees({ setEmployee }) {

  // use state to bring in the data
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteEmp, setDeleteEmp] = useState([]);

  const navigate = useNavigate();


  // RETRIEVE the list of employees
  const loadEmployees = async () => {
    const response = await fetch('http://localhost:3006/employees');
    const employees = await response.json();
    setEmployees(employees);
  }

  // DELETE a single employee
  // exploration-implementing-a-full-stack-mern-app-part-2?module_item_id=21138419
  const onDeleteEmployee = async () => {
    setOpen(false);
    const response = await fetch(`http://localhost:3006/employees/${deleteEmp._id}`, { method: 'DELETE' });
    if (response.status === 200) {
      const getResponse = await fetch('http://localhost:3006/employees');
      const getEmployees = await getResponse.json();
      setEmployees(getEmployees);
    } else {
      alert(`The row for id:${deleteEmp._id} failed to delete due to (status code = ${response.status}).`)
    }
  }
  const confirmDelete = (deleteEmp) => {
    setDeleteEmp(deleteEmp);
    setOpen(true);
  }

  // UPDATE a single exercise
  const onEditEmployee = async employee => {
    setEmployee(employee);
    navigate("/edit-employee");
  }


  useEffect(() => {
    loadEmployees();
  }, []);



  return (
    <div className='flex flex-col pt-5 items-center mx-auto w-1/2 min-h-fit'>
        <h2 className='text-4xl font-bold text-slate-500 py-4 mx-auto w-fit'>Employees</h2>

        <p className='w-3/4 my-5 p-2 bg-slate-100 rounded-lg text-xl font-medium border border-slate-200 shadow-sm'>
          View, edit, and delete all employees currently in the database. Add a new employee by clicking on the "Add New Employee" button.</p>
        
        <EmployeeTable
          employees={employees}
          confirmDelete={confirmDelete}
          onEdit={onEditEmployee}
        />
        {open && <Confirmation onConfirm={onDeleteEmployee} open={open} setOpen={setOpen} />}
    </div>
  )
}

export default Employees;