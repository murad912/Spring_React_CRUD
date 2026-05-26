package com.employee.service;

import com.employee.exception.ResourceNotFoundException;
import com.employee.model.Employee;
import com.employee.repository.EmployeeRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    public Employee createEmployee(Employee employee){
        return employeeRepository.save(employee);
    }
    @Transactional(readOnly = true)
    public List<Employee> getAllEmployee(){
        return employeeRepository.findAll();
    }
    @Transactional(readOnly = true)
    public Employee getById(Long id){
        return employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id:" + id));
    }

    public Employee updateEmployee(Long id, Employee employee){
        Employee update = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id:" + id));
        update.setFirstName(employee.getFirstName());
        update.setMiddleName(employee.getMiddleName());
        update.setLastName(employee.getLastName());
        update.setDateOfBirth(employee.getDateOfBirth());
        update.setDepartment(employee.getDepartment());
        update.setSalary(employee.getSalary());

        return employeeRepository.save(update);
    }

    public void  deleteEmployee(Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }

}
