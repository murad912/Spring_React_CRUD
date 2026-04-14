import React, { useEffect, useState } from "react";
import { getAllEmployee, deleteEmployee, searchEmployees } from "../services/EmployeeService";
import { Link, useNavigate } from "react-router-dom";

function EmployeeList() {
  const [Employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const getAllEmployees = () => {
    getAllEmployee()
      .then((responsse) => {
        setEmployee(responsse.data);
      })
      .catch((error) => {
        console.error("Employee data is not exist", error);
      });
  };

  useEffect(() => {
    getAllEmployees();
  }, []);

  //delete functionality
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteEmployee(id).then(() => {
        console.log("Record Deleting!");
        alert("Emplpoyee id: " + id + " Deleted!");
        getAllEmployees();
      });
    }
  };

  // Function to fetch data based on search
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() !== "") {
      searchEmployees(value)
        .then((response) => setEmployee(response.data))
        .catch((error) => console.error("Search failed", error));
    } else {
      getAllEmployees(); // Show all if search is cleared
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2>Employee List</h2>

          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {Employee.map((emp) => {
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.firstName}</td>
                    <td>{emp.lastName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.department}</td>
                    {/* <td>{emp.salary}</td> */}
                    <td>${Number(emp.salary).toLocaleString()}</td>
                    <td className="text-center">
                      <div className="btn-group" role="group">
                        <Link
                          to={`/edit-employee/${emp.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(emp.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
