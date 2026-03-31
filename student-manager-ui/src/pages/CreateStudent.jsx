import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    department: "",
  });
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const API_URL = "http://localhost:8080/student";

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });

    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
  }

  };

   // 2. Local validation check
   const validateForm = () => {
    let tempErrors = {};
    if (!student.name.trim()) tempErrors.name = "Name is required";
    if (!student.department.trim()) tempErrors.department = "Department is required";
    if (!student.age || student.age <= 0) tempErrors.age = "Please enter a valid age";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // returns true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //stop refresh page let post send a data

    if (!validateForm()) return; // Stop if local validation fails

    axios
      .post(API_URL, student)
      .then((res) => {
        alert("Student Created!");
        // setStudent({ name: "", age: "", department: "" });
        navigate("/");
      })
      .catch((error) => {
         // 3. Handle Backend Errors (if they pass frontend check)
        if (error.response && error.response.data.errors) {
            setErrors(error.response.data.errors); 
        } else {
            console.log('Save failed:', error);
        }
      });
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 col-md-6 mx-auto">
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Name"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback mb-2">{errors.name}</div>}

          <input
           className={`form-control mt-2 ${errors.age ? 'is-invalid' : ''}`}
            name="age"
            type="number"
            placeholder="Age"
            value={student.age}
            onChange={handleChange}
          />
          {errors.age && <div className="invalid-feedback mb-2">{errors.age}</div>}

          <input
            className={`form-control mt-2 ${errors.department ? 'is-invalid' : ''}`}
            name="department"
            placeholder="Department"
            value={student.department}
            onChange={handleChange}
          />
          {errors.department && <div className="invalid-feedback mb-2">{errors.department}</div>}
          
          <button className="btn btn-primary w-100">Save Student</button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
