import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/employee";

function EmployeList() {
  const [employee, setEmployee] = useState([]);
  const [save, setSave] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    department: "",
    salary: "",
  });
const [editId, setEditId] = useState(null)


  const handleEmployeeList = () => {
    axios
      .get(API_URL)
      .then((respons) => {
        setEmployee(respons.data);
      })
      .catch((err) => {
        console.error("Error fetching employee data:", err);
      });
  };

  useEffect(() => {
    handleEmployeeList();
  }, []);

  const handleView = (id) => {
    axios.get(`${API_URL}/${id}`).then((res) => {
      alert(`======= EMPLOYEE DETAILS ========
                    \nFirst Name: ${res.data.firstName}
                    \nLast Name: ${res.data.lastName}
                    \nDepartment: ${res.data.department}
                    \nSalary: ${res.data.salary}`);
    });
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (isConfirmed) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          window.alert("Employee deleted successfully!");
          handleEmployeeList();
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          window.alert("Failed to delete employee.");
        });
    }
  };

  
  const handleChange = (e) => {
    setSave({ ...save, [e.target.name]: e.target.value });
  };

  const handleSaveOrUpdate = (e) => {
    e.preventDefault();

    // 1. Clone the form data payload to format the date safely
    const payload = { ...save };

    // 2. Format HTML date (yyyy-MM-dd) to match Backend @JsonFormat (dd-MMM-yyyy)
    if (payload.dateOfBirth && payload.dateOfBirth.includes("-") && payload.dateOfBirth.split("-")[0].length === 4) {
        const dateObj = new Date(payload.dateOfBirth);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = new Intl.DateTimeFormat("en", { month: "short" }).format(dateObj);
        const year = dateObj.getFullYear();
        payload.dateOfBirth = `${day}-${month}-${year}`; // e.g., 26-May-2026
    }

    // 3. Branch your logic using IF/ELSE to prevent executing both requests
    if (editId) {
        // UPDATE PATH
        axios.put(`${API_URL}/${editId}`, payload)
            .then(() => {
                alert('Employee Updated Successfully!');
                setEditId(null); // Clear Edit Mode
                setSave({ firstName: "", middleName: "", lastName: "", dateOfBirth: "", department: "", salary: "" });
                handleEmployeeList(); // Refresh Grid
            })
            .catch((error) => {
                console.error("Update error:", error);
                alert('Employee Update Failed!');
            });
    } else {
        // CREATE PATH
        axios.post(`${API_URL}/create`, payload)
            .then(() => {
                alert("Employee Saved Successfully!");
                setSave({ firstName: "", middleName: "", lastName: "", dateOfBirth: "", department: "", salary: "" });
                handleEmployeeList(); // Refresh Grid
            })
            .catch((error) => {
                console.error("Save error:", error);
                alert("Employee Save Failed!");
            });
    }
};

const handleUpdate = (id) => {
    // FIX: Changed single quotes '' to backticks `` so the URL string parses correctly
    axios.get(`${API_URL}/${id}`)
        .then((res) => {
            let backendDate = res.data.dateOfBirth; // coming back as e.g., "26-May-2026"
            let formattedDateForInput = "";

            // Convert backend dd-MMM-yyyy back to standard HTML input format yyyy-MM-dd
            if (backendDate) {
                const dateObj = new Date(backendDate);
                if (!isNaN(dateObj.getTime())) {
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    formattedDateForInput = `${year}-${month}-${day}`;
                }
            }

            setSave({
                firstName: res.data.firstName || "",
                middleName: res.data.middleName || "",
                lastName: res.data.lastName || "",
                dateOfBirth: formattedDateForInput, // Populates HTML element correctly
                department: res.data.department || "",
                salary: res.data.salary || ""
            });
            setEditId(id); // Set Edit Mode
        })
        .catch((err) => {
            console.error("Error fetching single employee for edit:", err);
        });
};


  return (
    <div className="container mt-4">
      <div className="mb-4">
        <h1>Employee Management</h1>
      </div>

      {/* Form Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="card-title mb-3">Add New Employee</h5>
        <form className="row g-3" onSubmit={handleSaveOrUpdate}>
          <div className="col-md-4">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={save.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="middleName"
              value={save.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={save.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              name="dateOfBirth"
              value={save.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={save.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              name="salary"
              value={save.salary}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12 mt-3">
            <button type="submit" className="btn btn-success">
            {editId ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">DOB</th>
              <th scope="col">Department</th>
              <th scope="col">Salary</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.firstName}</td>
                <td>{item.middleName}</td>
                <td>{item.lastName}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.department}</td>
                <td>{item.salary}</td>
                <td>
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleView(item.id)}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleUpdate(item.id)}
                    >
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeList;
