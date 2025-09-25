package com.edutracker.student;

import com.edutracker.user.User;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;

@Entity @Getter @Setter
@Table(name = "student_profiles")
public class StudentProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User user;
    private String program;
    private String department;
    private Double cgpa;
    private Double attendancePercent;
    private Integer creditPoints;
}
