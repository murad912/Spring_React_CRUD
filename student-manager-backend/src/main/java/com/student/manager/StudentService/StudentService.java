package com.student.manager.StudentService;

import com.student.manager.Repository.StudentRepository;
import com.student.manager.StudentMapper.StudentMapper;
import com.student.manager.dto.StudentDto;
import com.student.manager.model.Student;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    private final StudentRepository studentRepository;



    StudentService(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    public StudentDto createStudent(StudentDto studentDto){
        Student student = StudentMapper.mapToStudent(studentDto);
        Student savedStudent = studentRepository.save(student);
        return  StudentMapper.mapToStudentDTO(savedStudent);

    }

    public StudentDto getStudentById(Long id){
       Student student=  studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource Not Found" + id));

       return StudentMapper.mapToStudentDTO(student);
    }


    public List<StudentDto> getAllStudent(){
        List<Student> students =  studentRepository.findAll();
        return students.stream()
                .map(StudentMapper::mapToStudentDTO)
                .collect(Collectors.toList());
    }


    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

    @Transactional
    public StudentDto updateStudent(Long id, StudentDto studentDto) {
        Student student = studentRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Resource Not Found" + id));
        student.setName(studentDto.getName());
        student.setAge(studentDto.getAge());
        student.setDepartment(studentDto.getDepartment());

        Student updatedStudent = studentRepository.save(student);

        return StudentMapper.mapToStudentDTO(updatedStudent);
    }
}
