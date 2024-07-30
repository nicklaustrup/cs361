import React from 'react';

const EmployeeTableRow = ({ employee }) => {


  return (
    <tr>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{employee.email}</td>
        <td>{employee.phone}</td>
        <td>{employee.team}</td>
    </tr>
  )
}

export default EmployeeTableRow;