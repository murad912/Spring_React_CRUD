import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, getTaskById, updateTask } from '../services/TaskService';


function CreateTask() {
 const { id } = useParams(); 
const navigate = useNavigate();
const [taskData, setTaskData] = useState({title:'', description:'', status:'', employeeId:''})

const handleChange = (e) => {
  setTaskData({...taskData, [e.target.name]: e.target.value})
}

const handleSaveOrUpdateTask = (e) => {
    e.preventDefault();
    if(id){
    updateTask(id,taskData).then((res) => {
        alert('Task record is Updating!')
        navigate('/task-list');
    }).catch((err) => {
        alert('Update task failed!!', err)
    })

    }else {
    e.preventDefault();
    createTask(taskData).then(() => {
        alert('Task Saved Successfully!')
        navigate("/task-list");
    }).catch((err) => {
        alert('Task Failed to Save', err)
    })
}
}


useEffect(() =>{
if(id){
  getTaskById(id).then((res) => {
    setTaskData(res.data)
  }).catch((err) => {
    alert('Feacth Error!!')
  })
}
}, [id])

  return (
    <div className='container-fluid'>
            <div className="card p-4 col-md-6 mx-auto">
                {id ? 'UPDATE TASK' : 'CREATE TASK'}
                <form action="" onSubmit={handleSaveOrUpdateTask}>
                    <input type="text" className='form-control mb-3'
                    placeholder='Enter Title'
                    name='title'
                    value={taskData.title}  
                    onChange={handleChange}/> 

                    <input type="text" className='form-control'
                    placeholder='Enter Description'
                    name='description'
                    value={taskData.description}  
                    onChange={handleChange}/> 

                    {/* <input type="text" className='form-control mb-3'
                    placeholder='Enter Status'
                    name='status'
                    value={taskData.status}  
                    onChange={handleChange}/>  */}

                    <label className="form-label mb-3">Task Status</label>
                    <select 
                        className='form-select mb-3' // Use 'form-select' for Bootstrap styling
                        name='status'
                        value={taskData.status}  
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select> 

                    <input type="text" className='form-control mb-3'
                    placeholder='Enter Employee ID'
                    name='employeeId'
                    value={taskData.employeeId}  
                    onChange={handleChange}/> 

                    <button type='submit' className='btn btn-outline-primary'>{ (id) ? "Update": "Submit"}</button>

                </form>
            </div>
      
    </div>
  )
}

export default CreateTask
