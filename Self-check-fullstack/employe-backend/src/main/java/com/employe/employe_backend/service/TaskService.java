package com.employe.employe_backend.service;


import com.employe.employe_backend.exception.ResourceNotFoundException;
import com.employe.employe_backend.model.Task;
import com.employe.employe_backend.repository.TaskRepositor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepositor taskRepositor;

    public TaskService(TaskRepositor taskRepositor) {
        this.taskRepositor = taskRepositor;
    }

    public Task createTask(Task task){
        return taskRepositor.save(task);
    }


    public List<Task> getAllTask(){
        return taskRepositor.findAll();
    }

    public Task getTaskById(Long id){
        return taskRepositor.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is Not Exists with id : " + id));
    }

    public Task updateTaskById(Long id, Task task){
       Task update = taskRepositor.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is Not Exists with id : " + id));
       update.setId(task.getId());
       update.setTitle(task.getTitle());
       update.setDescription(task.getDescription());
       update.setStatus(task.getStatus());
       update.setEmployeeId(task.getEmployeeId());
       Task savedTask = taskRepositor.save(update);
       return savedTask;
    }

    public void deleteTask(Long id){
        taskRepositor.deleteById(id);
    }
}
