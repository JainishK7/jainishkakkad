package com.edutracker.activity;

import com.edutracker.student.StudentProfile;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.Instant;

@Entity @Getter @Setter
@Table(name = "activities")
public class Activity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private StudentProfile student;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityStatus status;

    @Column(length = 1000)
    private String title;

    @Column(length = 4000)
    private String description;

    private Instant startDate;
    private Instant endDate;
    private String evidencePath; // file path or S3 key
    private String externalLink;
    private Integer creditValue;
    private Instant submittedAt;
    private Instant approvedAt;
}
