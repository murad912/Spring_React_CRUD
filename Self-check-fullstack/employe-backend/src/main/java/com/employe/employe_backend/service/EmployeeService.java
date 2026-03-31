package com.employe.employe_backend.service;

import com.employe.employe_backend.dto.EmployeeDTO;

import java.util.List;

public interface EmployeeService {

    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO createEmployee(EmployeeDTO employeeDTO);
    void deleteEmployee (Long id);
    EmployeeDTO updateEmployee (Long id, EmployeeDTO employeeDTO);
    List<EmployeeDTO> searchEmployees(String query);
}
