package com.edutracker.activity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByStudentId(Long studentId);
}
