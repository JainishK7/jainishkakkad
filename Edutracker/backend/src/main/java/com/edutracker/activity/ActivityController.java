package com.edutracker.activity;

import com.edutracker.student.StudentProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityRepository repo;
    private final StudentProfileRepository students;

    public ActivityController(ActivityRepository repo, StudentProfileRepository students) {
        this.repo = repo;
        this.students = students;
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT','FACULTY','VALIDATOR','SUB_ADMIN','SUPER_ADMIN')")
    public List<Activity> list(@PathVariable Long studentId) {
        return repo.findByStudentId(studentId);
    }

    @PostMapping("/submit/{studentId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Activity> submit(@PathVariable Long studentId, @RequestBody Activity activity) {
        var sp = students.findById(studentId).orElseThrow();
        activity.setStudent(sp);
        activity.setStatus(ActivityStatus.PENDING);
        activity.setSubmittedAt(Instant.now());
        return ResponseEntity.ok(repo.save(activity));
    }
}
