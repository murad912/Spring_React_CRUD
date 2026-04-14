import axios from 'axios';
import React, { useEffect, useState } from 'react'



function OnePageCrud() {

    const [employees, setEmployees] = useState([]);
    const [formEmployee, setFormemployee ] = useState({id:'', firstName:'', lastName:'', email:'', department:'', salary:''})
    const [editId, setEditId] = useState(null);


    const API_URL = 'http://localhost:8080/api/employee';

    // Hanle form chage 
    const handleFormChange = (e) => {
        setFormemployee({...formEmployee, [e.target.name]: e.target.value})
    }

    //handleSave Or Update
    const handleSaveOrUpdate = (e) => {
        e.preventDefault();
        if(editId){
            axios.put(`${API_URL}/${editId}`, formEmployee).then((response) =>{
                alert('Employee Updated!')
                handleViewList();
                clearForm();
            }).catch((err) => {
                alert('Update Faild', err);
            })
        }else{
        axios.post(API_URL, formEmployee).then((response) => {
            alert('Employee saved sucessfully!');
            handleViewList();
            clearForm();
            
        }).catch((err) =>{
            console.error('Save Faild !', err)
        })
     }
    }

    // handle edit
    const handleEdit = (id) => {
        axios.get(`${API_URL}/${id}`).then((res) => {
            setFormemployee({
                id: res.data.id,
                firstName: res.data.firstName, 
                lastName: res.data.lastName,
                email: res.data.email,
                department: res.data.department,
                salary: res.data.salary
            })
            setEditId(id);
        })
    }

    // Clear form
    const clearForm = () => {
        setFormemployee({firstName:'', lastName:'', email:'', department:'', salary:''})
        setEditId(null); 
    }

    // const handleViewList = async () => {
    //     try {
    //         const response = await axios.get(API_URL);
    //         setEmployees(response.data);
    //     } catch (err) {
    //         console.error('Data fetch error', err);
    //     }
    // }
    const handleViewList = async () => {
        axios.get(API_URL).then((response) =>{
            setEmployees(response.data);
        }).catch((err) =>{
            console.error('Data featch error', err)
        })
    }

    useEffect(() => {
        handleViewList();
    }, [])



    const handleViewSigleview = (id) => {
        axios.get(`${API_URL}/${id}`).then((response) => {
            // alert(`Employee List \nName : ${response.data.firstName} ${response.data.lastName} \nEmail: ${response.data.email} \nDepartment: ${response.data.department} \nSalary: ${response.data.salary}`)
            alert(
                `=== EMPLOYEE LIST ===\n\n` + // All caps and spacing makes it pop
                `Name : ${response.data.firstName} ${response.data.lastName} \n` +
                `Email: ${response.data.email} \n` +
                `Department: ${response.data.department} \n` +
                `Salary: ${response.data.salary}`
            );
        })
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this employee?')){

        axios.delete(`${API_URL}/${id}`).then(() => {
            alert(`Employee with ID ${id} deleted successfully!`);
            handleViewList();
        }).catch((err) => {
            alert('Delete data faild', err)
        }) 
    }
    }
  return (
    <div className='container'>
        <div className="container-fluid">
            <h2>Employee List</h2>
            <div className="container text-center mb-3">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope='col'>FirstName</th>
                            <th scope='col'>LastName</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Department</th>
                            <th scope='col'>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.salary}</td>
                                    <td>
                                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button onClick={(() => handleViewSigleview(emp.id))} type="button" className="btn btn-info">View</button>
                                        <button type="button" className="btn btn-warning" onClick={(() => {handleEdit(emp.id)})}>Edit</button>
                                        <button onClick={(() => {handleDelete(emp.id)})} type="button" className="btn btn-danger">Delete</button>
                                        </div>                                      
                                    </td>
                                </tr>
                            ))
                        }
                        
                    </tbody>

                </table>
            </div>
            <div className="card p-4 col-md-6 mx-auto">
                {editId ? 'EMPLOYE UPDATE' : 'EMPLOYE CREATE'}
                        <form  onSubmit={handleSaveOrUpdate}>
                            <input type="text" 
                            placeholder='Enter First Name'
                            className='form-control mb-3'
                            name='firstName'
                            value={formEmployee.firstName}
                            onChange={handleFormChange}
                            />
                              <input type="text" 
                            placeholder='Enter Last Name'
                            className='form-control mb-3'
                            name='lastName'
                            value={formEmployee.lastName}
                            onChange={handleFormChange}
                            />
                              <input type="text" 
                            placeholder='Enter Email'
                            className='form-control mb-3'
                            name='email'
                            value={formEmployee.email}
                            onChange={handleFormChange}
                            />
                             
                            <input type="text" 
                            placeholder='Enter Department'
                            className='form-control mb-3'
                            name='department'
                            value={formEmployee.department}
                            onChange={handleFormChange}
                            />
                            <input 
                             type="number"
                            placeholder='Enter Salary'
                            className='form-control mb-3'
                            name='salary'
                            value={formEmployee.salary}
                            onChange={handleFormChange}
                            />
                            <button className='btn btn-outline-primary' type='submit'>{!editId ? 'Submit' : 'Update'}</button>


                        </form>

                    </div>
            
        </div>
      
    </div>
  )
}

export default OnePageCrud
