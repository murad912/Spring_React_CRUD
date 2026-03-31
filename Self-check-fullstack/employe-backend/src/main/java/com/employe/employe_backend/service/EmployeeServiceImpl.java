package com.employe.employe_backend.service;

import com.employe.employe_backend.dto.EmployeeDTO;
import com.employe.employe_backend.exception.ResourceNotFoundException;
import com.employe.employe_backend.mapper.EmployeeMapper;
import com.employe.employe_backend.model.Employee;
import com.employe.employe_backend.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private  final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }


    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employee = employeeRepository.findAll();

        return employee.stream().map(EmployeeMapper::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee is Not Exists with id : " + id));

        return EmployeeMapper.mapToEmployeeDTO(employee);
    }

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

        Employee emp = EmployeeMapper.mapToEmployee(employeeDTO);

        Employee saveEmp = employeeRepository.save(emp);

        return EmployeeMapper.mapToEmployeeDTO(saveEmp);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is Not Exists with id : " + id));
        employeeRepository.deleteById(id);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepository.findById(id) .orElseThrow(() -> new ResourceNotFoundException("Employee is Not Exists with id : " + id));

        employee.setFirstName(employeeDTO.getFirstName());
        employee.setLastName(employeeDTO.getLastName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setSalary(employeeDTO.getSalary());
        employee.setDepartment(employeeDTO.getDepartment());

        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDTO(updatedEmployee);
    }

    @Override
    public List<EmployeeDTO> searchEmployees(String query) {
        List<Employee> search = employeeRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query, query);
        return search.stream()
                .map(EmployeeMapper::mapToEmployeeDTO)
                .collect(Collectors.toList());
    }
}
