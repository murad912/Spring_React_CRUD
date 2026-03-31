package com.student.manager.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDto {
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @Min(value = 1, message = "Age must be at least 1")
    private int age;
    @NotBlank(message = "Department is required")
    private String department;

}
