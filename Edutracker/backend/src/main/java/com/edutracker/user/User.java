package com.edutracker.user;

import com.edutracker.org.Organization;
import jakarta.persistence.*;
import lombok.Getter; import lombok.Setter;
import java.util.Set;

@Entity @Getter @Setter
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false)
    private String passwordHash;
    private String fullName;
    private boolean enabled = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @ManyToOne
    private Organization organization; // null for SUPER_ADMIN
}
