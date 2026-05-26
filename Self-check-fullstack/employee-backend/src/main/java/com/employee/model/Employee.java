package com.employee.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String firstName;
    private String middleName;

    @NotBlank
    @Column(nullable = false)
    private String lastName;

    @Past(message = "Date of birth must be in the past")
    @JsonFormat(pattern = "dd-MMM-yyyy")
    private LocalDate dateOfBirth;

    private String department;

    @DecimalMin(value = "0.0", inclusive = false, message = "Salary must be greater than 0")
    private Double salary;
}
