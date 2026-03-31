package com.student.manager.StudentMapper;

import com.student.manager.dto.StudentDto;
import com.student.manager.model.Student;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Configuration
public class StudentMapper {


    public static StudentDto mapToStudentDTO (Student student){
        return new StudentDto(
               student.getId(),
               student.getName(),
                student.getAge(),
                student.getDepartment()
        );
    }


    public static Student mapToStudent (StudentDto studentDto){
        return  new Student(
               studentDto.getId(),
               studentDto.getName(),
               studentDto.getAge(),
               studentDto.getDepartment()
        );
    }
}
