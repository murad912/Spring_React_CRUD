package com.employe.employe_backend.repository;

import com.employe.employe_backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TaskRepositor extends JpaRepository<Task, Long> {
}

