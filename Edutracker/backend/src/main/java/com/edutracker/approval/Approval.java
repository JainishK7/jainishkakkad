package com.edutracker.approval;

import com.edutracker.activity.Activity;
import com.edutracker.user.User;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.time.Instant;

@Entity @Getter @Setter
@Table(name = "approvals")
public class Approval {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Activity activity;

    @ManyToOne(optional = false)
    private User approver; // faculty or validator

    @Column(length = 1000)
    private String comment;

    private boolean approved;
    private Instant createdAt = Instant.now();
}
