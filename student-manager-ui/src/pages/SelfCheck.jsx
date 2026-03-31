import React, { useEffect, useState } from "react"
import {getAllStudent, saveStudent , deleteStudent, updateStudent, getStudentById} from "../services/studentService";


// For Featch
function SelfCheck() {
  const [student, setStudent] = useState([]);
  const [load, setLoad] = useState(true);

//   for POST
const [name, setName] = useState("");
const [age, setAge] = useState("");
const [department, setDepartment] = useState("");
// end

// For Update
const [editId, setEditId] = useState(null); // null = Create Mode, ID = Edit Mode
// End

  const fetchData = () => {
    getAllStudent()
      .then((respons) => {
        setStudent(respons.data);
        setLoad(false);
      })
      .catch((error) => {
        console.error("Data Featch Error", error);
        setLoad(false);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);


// POST
const createStudent = (e) => {
    e.preventDefault();
    const student = {name, age, department}

    if(editId){
      updateStudent(editId,  student).then(() => {
        alert("Update!");
        resetForm();
      });
    } else{
    saveStudent(student).then(() => {
        alert("Student Saved!!")
        fetchData();
        // name('');
        // age('');
        // department('');
        resetForm();
    }).catch((error) => {
        console.log('Save failed:',error);
    })
}
}

const resetForm = () => {
    setEditId(null);
    setName(""); 
    setAge(""); 
    setDepartment("");
    fetchData();
};

//  DELTE
const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
        deleteStudent(id)
            .then((response) => {
                alert("Student Deleted!");
                fetchData(); // 🔄 Refresh the list automatically
            })
            .catch((error) => {
                console.error("Delete failed:", error);
            });
    }
};

//handle Edit function (to fill the form):
const handleEdit = (id) => {
    getStudentById(id).then((res) =>{
        setEditId(id);
        setName(res.data.name);
        setAge(res.data.age);
        setDepartment(res.data.department);

    });

}

  return (
    <div className="container">
      <div className="row justify-content-center">
        <h2>Student List</h2>

        <div className="col-md-9">
            <table className="table table-hover table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Departnet</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead> 
                <tbody>
                {
                    student.map((stud) => (
                        <tr key={stud.id}> 
                        <td>{stud.id}</td>
                        <td>{stud.name}</td>
                        <td>{stud.age}</td>
                        <td>{stud.department}</td>
                        <td>
                        <button className="btn btn-info btn-sm me-2" 
                        onClick={() => handleEdit(stud.id)}>Edit</button>

                        <button 
                        className="btn btn-danger btn-sm me-2" 
                        onClick={() => handleDelete(stud.id)}
                    >
                        Delete
                    </button>
                        </td>
                        </tr>
                    ))
                }

                </tbody>

            </table>

        </div>

        <div className="col-md-9">
        <h2>Create Student</h2>
            <form  onSubmit={createStudent}>
                <input 
                className="form-control mb-3"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />

                <input className="form-control mb-3"
                placeholder="Enter Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                />

                <input className="form-control mb-3"
                placeholder="Enter Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                />

                {/* <button className="btn btn-success">Submite</button> */}
                <button className="btn btn-success">
                   {editId ? "Update" : "Submit"}
                </button>

            </form>
        </div>
      </div>
    </div>
  );
}

export default SelfCheck;
