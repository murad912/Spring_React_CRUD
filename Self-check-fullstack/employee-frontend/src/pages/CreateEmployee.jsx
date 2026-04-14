import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {createEmployee, getEmployeById, updateEmployee} from '../services/EmployeeService'

function CreateEmployee() {
    const { id } = useParams(); // Grabs the ID from the URL (/edit-employee/:id)
    const navigate = useNavigate();

    const [employees, setEmployees] = useState({firstName:'', lastName:'', email:'', department:'', salary:''});
    // const [editId, setEditId] = useState(null); 
    const [errors, setErrors] = useState({})

    

    // Load data if in "Edit Mode"
    useEffect(() => {
        if (id) {
            getEmployeById(id).then((response) => {
                setEmployees(response.data);
            }).catch(error => console.error("Could not fetch employee", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setEmployees({...employees, [e.target.name]: e.target.value });
        // setEditId(null);
     
    }

    const clearForm = () => {
        setEmployees({ firstName:'', lastName:'',email:'', department:'', salary:''});

    }

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();
    if(id){
            updateEmployee(id, employees).then(() => {
                alert('Employe record is Updating!')
                navigate("/");
            
            }).catch((error) => {
                console.error('Update Failed!', error)
            })

    } else {
        createEmployee(employees).then((response) => {
            alert('Employee Record Saved!!')
            navigate("/");
        }).catch((err) => {
            console.error('Save Error!', err)
        })
    }
    }

 //update functionality
//  const handleEdit = (id) => {
//     getEmployeById(id).then((response) => {
//         setEmployees({
//             firstName:`${response.data.firstName}`,
//             lastName:  `${response.data.lastName}`,
//             email : `${response.data.email}`,
//             department : `${response.data.department}`,
//             salary : `${response.data.salary}`
//         });
//         setEditId(id); 
//     })

// }
  return (
    <div className='container mt-4'>
        <div>
        <div className="card p-4 col-md-6 mx-auto">
        <h3>{id ? "Update Employee" : "Add New Employee"}</h3>
        <form onSubmit={saveOrUpdateEmployee}>

            <input  className='form-control mb-3'
            placeholder='Enter FirstName' 
            name='firstName'
            value={employees.firstName}
            onChange={handleChange}/>

            <input type="text" className='form-control mb-3'
            placeholder='Enter LastName' 
            name='lastName'
            value={employees.lastName}
            onChange={handleChange}/>

            <input type="text" className='form-control mb-3'
            placeholder='Enter email' 
            name='email'
            value={employees.email}
            onChange={handleChange}/>

            <input type="text" className='form-control mb-3'
            placeholder='Enter Department' 
            name='department'
            value={employees.department}
            onChange={handleChange}/>

            <input  className='form-control mb-3'
            placeholder='Enter Salary' 
            name='salary'
            value={employees.salary}
            onChange={handleChange}/>

<button type="submit" className='btn btn-primary w-100'>
                        {id ? "Update" : "Submit"}
                    </button>


        </form>

        </div>
      </div>
    </div>
  )
}

export default CreateEmployee
