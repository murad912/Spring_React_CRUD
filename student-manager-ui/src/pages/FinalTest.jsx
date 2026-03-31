import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { generatePath } from 'react-router-dom';


function FinalTest() {

    const [students, setStudent] = useState([]);
    const [formData, setFormData] = useState({id:'', name:'', age:'', department:''});
    const [editId, setEditId] = useState(null);

   const API_URL = 'http://localhost:8080/student';

   // 1. Get All Data
   const featchStudent = async () => {
    axios.get(API_URL, students).then((response) => {
        setStudent(response.data);
        console.log('Student Data ', response);
    }).catch((err) => {
        console.error('Data Featch Error', err)
    })
   }

   useEffect(() => {
    featchStudent(); 
   }, [])


    // 2. view Single Data
    const handleSingleView = (id) => {

        axios.get(`${API_URL}/${id}`).then((res) => {
       
            alert(`Student Information \n Student Id: ${res.data.id} \nStudent Name: ${res.data.name} \nStudent Age: ${res.data.age} \nStudent Department : ${res.data.department}`);
        })
        .catch(err => console.error("Could not find student", err));
    }

    // 3.  Create Student step 1
    const hanldeForm = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

    //step 2 - Save or Update (if editId true update or save)
    const handleSubmit = (e) => {
        e.preventDefault();
        if(editId){
            axios.put(`${API_URL}/${editId}`, formData).then((response) =>{
                alert('Student Data Updating!');
                featchStudent();
                clearForm();
            })
        }else{
        axios.post(API_URL, formData).then(() => {
            alert('Student Created!')
            clearForm();
            featchStudent();
        }).catch((err) =>{
            alert('Faild to create!!')
        });
    }
    }

    //step 3 clear form
    const clearForm = () =>{
        setFormData({id:'', name:'', age:'', department:''})
        setEditId(null); 
    }

    //help to handle edit
    const handleEdit = (id) => {
        axios.get(`${API_URL}/${id}`).then((res) => {
            setFormData({name:`${res.data.name}`, age:`${res.data.age}`, department:`${res.data.department}`})
            setEditId(id);
        })
    }

    //step 4. delete 
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
        axios.delete(`${API_URL}/${id}`).then((res) => {
            alert('Student id: ' + id + ' Deleted!');
            featchStudent();
        }).catch((err) =>{
            console.error('Delete is not sucess!', err)
        })
    }
    }

  return (

    <div className='container-sm'>
        <div>
            <h1>List Student</h1>
         
                <div className='d-inline p-2'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Age</th>
                                <th scope='col'>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map((student) => {
                                    return(
                                    <tr key={student.id}>
                                         <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.age}</td>
                                        <td>{student.department}</td>
                                        <td><button type="button" className="btn btn-outline-info" onClick={(() => {handleSingleView(student.id)})}>View</button></td>
                                        <td><button type="button" className="btn btn-outline-primary" onClick={(() => {handleEdit(student.id)})}>Edit</button></td>
                                        <td><button type="button" className="btn btn-outline-danger" onClick={(() => {handleDelete(student.id)})}>Delete</button></td>
                                    </tr>
                                    )
                                })
                            }
                        </tbody>

                    </table>

                </div>
                <div className="card p-4 col-md-6 mx-auto">
                    <form className="text-start" onSubmit={handleSubmit}>
                
                        <input  className="form-control mb-3"
                        placeholder='Enter Name'
                        name='name'
                        value={formData.name}
                        onChange={hanldeForm}
                        />

                     
                        <input  className="form-control mb-3"
                        placeholder='Enter Age'
                        name='age'
                        value={formData.age}
                        onChange={hanldeForm}
                        />
                   
                        <input className="form-control mb-3"
                        placeholder='Enter Department'
                        name='department'
                        value={formData.department}
                        onChange={hanldeForm}/>
                        <button className="btn btn-success" type='submit'>
                        {editId ? 'Update' : 'Submit'}</button>
                     
                    </form>

                </div>


   
        </div>
    </div>
  )
}

export default FinalTest