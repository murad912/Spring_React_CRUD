import React, { useEffect, useState } from 'react'
import axios from 'axios';


function EmployeList() {

    const [employee, setEmployee] = useState([]);

    const API_URL = "http://localhost:8080/api/employee"

    const hanleEmployeeList = (() => {
        axios.get(API_URL).then((respons) =>{
            setEmployee(respons.data);
        }).catch((err) =>{
            console.error('Error fetching employee data:',err)
        })
    })

    useEffect(() => {
            hanleEmployeeList();
    }, [])

  return (
    <div className='container'>
        <div>
            <h1>Employee List</h1>
        </div>
        <div className='mb-3'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope="col">First Name</th>
                        <th scope="col">Middle Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Department</th>
                        <th scope="col">Saary</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map((item)=>(

                            <tr key={item.id}>
                                <td>{item.firstName}</td>
                                <td>{item.middleName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.department}</td>
                                <td>{item.salary}</td>
                                <td><button className='btn btn-info'>View</button></td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </div>

      
    </div>
  )
}

export default EmployeList
