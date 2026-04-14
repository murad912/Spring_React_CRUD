package com.employe.employe_backend.controller;


import com.employe.employe_backend.model.Task;
import com.employe.employe_backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public ResponseEntity<List<Task>> displayAllTask(){
        List<Task> data = taskService.getAllTask();
        return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Task> saveTask(@RequestBody Task task){
        Task response = taskService.createTask(task);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById (@PathVariable Long id){
        Task response = taskService.getTaskById(id);
        return ResponseEntity.ok(response);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task task){
        Task updateTask = taskService.updateTaskById(id, task);
        return new ResponseEntity<>(updateTask, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask (@PathVariable long id){
       taskService.deleteTask(id);
       return ResponseEntity.ok("Task Delete Successfully!");
    }
}
