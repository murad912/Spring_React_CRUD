package com.employe.employe_backend.mapper;


import com.employe.employe_backend.dto.EmployeeDTO;
import com.employe.employe_backend.model.Employee;

public class EmployeeMapper {

    public static EmployeeDTO mapToEmployeeDTO (Employee employee){
            return new EmployeeDTO(
                    employee.getId(),
                    employee.getFirstName(),
                    employee.getLastName(),
                    employee.getEmail(),
                    employee.getDepartment(),
                    employee.getSalary()
            );
    }

    public static Employee mapToEmployee(EmployeeDTO employeeDTO){
        return  new Employee(
                employeeDTO.getId(),
                employeeDTO.getFirstName(),
                employeeDTO.getLastName(),
                employeeDTO.getEmail(),
                employeeDTO.getDepartment(),
                employeeDTO.getSalary()
        );
    }
}

