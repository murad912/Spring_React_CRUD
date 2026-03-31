import axios from "axios";

const API_URL = "http://localhost:8080/student";

export const getAllStudent = () => {
    return axios.get(API_URL);
}
// export const fetchAllStudentsFromBackend = () => { 
//     return axios.get("http://localhost:8080/student"); 
// }

export const saveStudent = (student) => {
     return axios.post(API_URL, student);
}

// services/studentService.js
export const deleteStudent = (studentId) => {
    return axios.delete(`${API_URL}/${studentId}`);
};

// Get a single student for editing
export const getStudentById = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

// Update an existing student
export const updateStudent = (id, student) => {
    return axios.put(`${API_URL}/${id}`, student);
};