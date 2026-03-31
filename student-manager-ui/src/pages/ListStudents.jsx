import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListStudents() {

    const[students, setStudent] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    // ----- Pagination Sate --- 
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);

    const API_URL = 'http://localhost:8080/student';

 const fetchStudent = async () => {

     axios.get(API_URL).then((response) => {
        setStudent(response.data)
        setLoading(false);
     })
     .catch((error) => {
        console.error('Student Data is Not Available', error)
        setLoading(false);
     })
 };

 useEffect(() => {
    fetchStudent();
 }, []);

 // --- Pagination Logic ---
 const indexOfLastRecord = currentPage * recordsPerPage;
 const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
 const currentRecords = students.slice(indexOfFirstRecord, indexOfLastRecord);
 const nPages = Math.ceil(students.length / recordsPerPage);

   const nextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1);
    }
    const prevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1);
    }

 //View individual row
 const viewStudent = (id) => {
    axios.get(`${API_URL}/${id}`)
        .then((response) => {
            // Usually you would navigate to a new page or show a Modal
            alert(`Student Details: \nName: ${response.data.name} \nDept: ${response.data.department}`);
        })
        .catch(err => console.error("Could not find student", err));
};

 if (loading) return <div className="container mt-5">Loading...</div>;
 if (error) return <div className="container mt-5 text-danger">{error}</div>;


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-9">
          <h1>Student LIst</h1>
          <Link to="/add-student" className="btn btn-primary mb-2">
        Add New Student
    </Link>
          <table className="table table-striped table-bordered mt-3">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Student Name</th>
                <th scope="col">Student Age</th>
                <th scope="col">Departmet</th>
              </tr>
            </thead>
            <tbody>
              {/* {students.map((item) => ( */}
              {currentRecords.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.department}</td>
                  <td>
                    <button className="btn btn-info btn-sm" onClick={() => viewStudent(item.id)}>View</button>
                  </td>
                </tr>
                )
              )}
            </tbody>
          </table>

          {/* --- Pagination Buttons --- */}
          <div className="d-flex justify-content-between align-items-center mt-3">
                        <button 
                            className="btn btn-outline-primary" 
                            onClick={prevPage}
                            disabled={currentPage === 1}
                        >
                            Back
                        </button>
                        
                        <span>Page <strong>{currentPage}</strong> of {nPages}</span>

                        <button 
                            className="btn btn-outline-primary" 
                            onClick={nextPage}
                            disabled={currentPage === nPages || nPages === 0}
                        >
                            Next
                        </button>
                    </div>
        </div>
      </div>
    </div>
  );
}

export default ListStudents;
