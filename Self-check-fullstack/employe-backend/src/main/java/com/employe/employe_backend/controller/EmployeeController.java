package com.employe.employe_backend.controller;


import com.employe.employe_backend.dto.EmployeeDTO;
import com.employe.employe_backend.service.EmployeeServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeServiceImpl employeeService;

    @PostMapping
    ResponseEntity<EmployeeDTO> createEmployee(@Valid @RequestBody EmployeeDTO employeeDTO){
        EmployeeDTO savedEmployee = employeeService.createEmployee(employeeDTO);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);

    }

    @GetMapping
    ResponseEntity<List<EmployeeDTO>> getAllEmployee(){
        List<EmployeeDTO> allEmp = employeeService.getAllEmployees();
//        return new ResponseEntity<>(allEmp, HttpStatus.OK);
        return ResponseEntity.ok(allEmp);
    }


    @GetMapping("{id}")
    ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable ("id") Long id){
        EmployeeDTO employeeDTO = employeeService.getEmployeeById(id);
        return  ResponseEntity.ok(employeeDTO);
    }

    @PutMapping("{id}")
    ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO updateEmp){
        EmployeeDTO update = employeeService.updateEmployee(id, updateEmp);
        return ResponseEntity.ok(update);
    }

    @DeleteMapping("{id}")
    ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted Successfully!");
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeDTO>> searchEmployees(@RequestParam("query") String query) {
        List<EmployeeDTO> results = employeeService.searchEmployees(query);
        return ResponseEntity.ok(results);
    }

}
