import React from 'react'
import axios from 'axios'
import { useState, useEffect } from "react";


function Test() {
  const[students, setStudent] = useState([]);


    const API_URL = 'http://localhost:8080/student';

    const getList = async () => {

        axios.get(API_URL)
        .then((response) => {
            setStudent(response.data);
        }).catch((err) =>{ 
            console.error("Data not found", err)
        })
    }
useEffect(() => {
    getList();
}, [])

//   Post
  const[stud, setStud] = useState({id:'',name:"", age:'',department:''})

  const handleChane = (e) => {
   setStud({...stud, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
  e.preventDefault();
    if(editId){
      axios.put(`${API_URL}/${editId}`, stud)
      .then((response) => {
        alert('Student Updated!')
        getList();
        clearForm();
      })
    }else{
  
        axios.post(API_URL, stud)
        .then((res) => {
            alert('Student Created');
            getList();
            clearForm();
        }).catch((err) =>{
            console.error('Create is not success', err)
        })
      }
  }

  const clearForm = () =>{
    setStud({id:'', name:'', age:'', department:''});
  }

  // handle view button
  const handleView = (id) => {

    axios.get(`${API_URL}/${id}`).then((res) => {
      setStud(res);
      alert(`Student Information: \nName : ${res.data.name} \nAge: ${res.data.age} \nDepartment: ${res.data.department}`);
    })
    .catch(err => console.error("Could not find student", err));
  }

  // handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
    axios.delete(`${API_URL}/${id}`).then(() => {
      alert('Student id: ' + id + ' Deleted!');
      getList();
    }).catch((error) =>{
      console.error('Delete failed', error)
    })
  }
  }

  // handle edit
  const [editId, setEditId] = useState(null); // null = Create Mode, ID = Edit Mode

  const handleEdit = (id) => {
    axios.get(`${API_URL}/${id}`).then((res) => {
      setStud({name:`${res.data.name}`, age:`${res.data.age}`, department:`${res.data.department}`});
      setEditId(id);
    })

  }


  return (
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-9">
            <table className='table table-hover table-bordered mt-3'>
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Age</th>
                    <th scope="col">Department</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                   {
                    students.map((item) => (
                       <tr key={item.id}> 
                       <td>{item.id}</td>
                       <td>{item.name}</td>
                       <td>{item.age}</td>
                       <td>{item.department}</td>
                       <td><button onClick={(() => handleView(item.id))} className='btn btn-info'>vew</button></td>
                       <td><button onClick={(() => handleEdit(item.id))} className='btn btn-primary'>Edit</button></td>
                       <td><button onClick={(() => handleDelete(item.id))}  className='btn btn-danger'>Delete</button></td>
                       </tr>
                    ))
                   } 
                    
                </tbody>
            </table>

        </div>
    </div>
    <div className="card p-4 col-md-6 mx-auto">
                   <form onSubmit={handleSubmit}>
                    <input type="text" className="form-control mb-3"
                    placeholder='Enter Name'
                    name='name'
                    value={stud.name}
                    onChange={handleChane}
                    />
                    <input type="text" className="form-control mb-3"
                    placeholder='Enter Age'
                    name="age" 
                    value={stud.age} 
                    onChange={handleChane}
                    />
                    <input type="text" className="form-control mb-3"
                    placeholder='Enter Department'
                    name="department" 
                    value={stud.department} 
                    onChange={handleChane}/>
                    {/* <button className="btn btn-primary">Save</button> */}
                    <button className="btn btn-success">
                   {editId ? "Update" : "Submit"}
                   </button>
                   </form>
                  </div>

    </div>
  )
}

export default Test