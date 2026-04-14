import React from 'react'
import axios from "axios";

const API_URL = 'http://localhost:8080/api/employee';

export const getAllEmployee = async () => {
    return axios.get(API_URL);
}
// export const getAllEmployees = () => axios.get(API_URL);


export const createEmployee = (employee) => {
    return axios.post(API_URL, employee);
}

export const getEmployeById = (id) => {
     return axios.get(`${API_URL}/${id}`);
}

export const updateEmployee = (id, employee) => {
    return axios.put(`${API_URL}/${id}`, employee);
}

export const deleteEmployee = (id) => {
     return axios.delete(`${API_URL}/${id}`);
}

export const searchEmployees = (query) => {
    return axios.get(`${API_URL}/search`, {
        params: { query: query }
    });
};