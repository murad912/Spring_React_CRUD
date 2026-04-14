import axios from 'axios';
import React from 'react'



const API_URL  = 'http://localhost:8080/api/task';

export const listAllTask = async () => {
    return axios.get(API_URL);

}

export const createTask = (task) => {
    return axios.post(API_URL, task);
}


export const deleteTask = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

export const updateTask = (id,task) => {
    return axios.put(`${API_URL}/${id}`,task)
}

export const getTaskById = (id) => {
    return axios.get(`${API_URL}/${id}`)
}

