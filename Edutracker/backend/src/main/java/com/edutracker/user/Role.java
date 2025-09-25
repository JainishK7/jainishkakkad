package com.edutracker.user;

import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;

@Entity @Getter @Setter
@Table(name = "roles")
public class Role {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String name; // SUPER_ADMIN, SUB_ADMIN, FACULTY, VALIDATOR, COMPANY, STUDENT
}
