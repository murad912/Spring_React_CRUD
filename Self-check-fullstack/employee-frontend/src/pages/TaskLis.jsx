import React, { useEffect, useState } from 'react'
import { deleteTask, listAllTask } from '../services/TaskService';
import { Link } from 'react-router-dom';



function TaskLis() {

    const [task, setTask] = useState([]);

    const hanleList = () => {
        listAllTask().then((res) => {
            setTask(res.data);
        }).catch((err) =>{
            console.error('Failed to featch data !', err)
        })   
    }

    useEffect(() =>{
        hanleList();
    }, []);

    const handleDelete = (id) => {
       
            if (window.confirm("Are you sure you want to delete this student?")) {
                 deleteTask(id).then(() => {   
                    alert('Task Deleting!');
                    hanleList();
                 }).catch((err) => {
                    alert('Delete task failed!', err)
                 })
            }
     
    }


  return (
    <div className='container'>
        <div className='row justify-content-center'>
        <div className="col-md-10">
            <h2 className=''>List of Task</h2>
            <div className="row mb-5">
                <table className='table table-hover'>
                    <thead>
                        <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Employee ID</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            task.map((item) => {
                                return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.status}</td>
                                    <td>{item.employeeId}</td>
                                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <Link
                          to={`/edit-task/${item.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td> 
                                </tr>
                            )})
                        }
                    </tbody>
                </table>

            </div>
            </div>
        </div>
      
    </div>
  )
}

export default TaskLis
