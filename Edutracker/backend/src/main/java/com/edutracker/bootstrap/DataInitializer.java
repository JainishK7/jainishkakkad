package com.edutracker.bootstrap;

import com.edutracker.org.Organization;
import com.edutracker.org.OrganizationRepository;
import com.edutracker.student.StudentProfile;
import com.edutracker.student.StudentProfileRepository;
import com.edutracker.user.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roles;
    private final UserRepository users;
    private final OrganizationRepository orgs;
    private final StudentProfileRepository students;
    private final PasswordEncoder encoder;

    public DataInitializer(RoleRepository roles, UserRepository users, OrganizationRepository orgs, StudentProfileRepository students, PasswordEncoder encoder) {
        this.roles = roles; this.users = users; this.orgs = orgs; this.students = students; this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        Role rAdmin = roles.findByName("SUPER_ADMIN");
        Role rSub = roles.findByName("SUB_ADMIN");
        Role rFac = roles.findByName("FACULTY");
        Role rVal = roles.findByName("VALIDATOR");
        Role rCom = roles.findByName("COMPANY");
        Role rStu = roles.findByName("STUDENT");

        var gu = orgs.findAll().stream().findFirst().orElseGet(() -> {
            Organization o = new Organization();
            o.setName("Global University"); o.setCode("GU");
            return orgs.save(o);
        });

        if (users.findByEmail("admin@edutracker.local").isEmpty()) {
            var u = new User();
            u.setEmail("admin@edutracker.local");
            u.setPasswordHash(encoder.encode("Admin@123"));
            u.setFullName("Super Admin");
            u.setRoles(Set.of(rAdmin));
            users.save(u);
        }

        if (users.findByEmail("subadmin@gu.local").isEmpty()) {
            var u = new User();
            u.setEmail("subadmin@gu.local");
            u.setPasswordHash(encoder.encode("SubAdmin@123"));
            u.setFullName("GU Sub Admin");
            u.setOrganization(gu);
            u.setRoles(Set.of(rSub));
            users.save(u);
        }

        if (users.findByEmail("faculty@gu.local").isEmpty()) {
            var u = new User();
            u.setEmail("faculty@gu.local");
            u.setPasswordHash(encoder.encode("Faculty@123"));
            u.setFullName("GU Faculty");
            u.setOrganization(gu);
            u.setRoles(Set.of(rFac));
            users.save(u);
        }

        if (users.findByEmail("validator@gu.local").isEmpty()) {
            var u = new User();
            u.setEmail("validator@gu.local");
            u.setPasswordHash(encoder.encode("Validator@123"));
            u.setFullName("External Validator");
            u.setRoles(Set.of(rVal));
            users.save(u);
        }

        if (users.findByEmail("company@jobs.local").isEmpty()) {
            var u = new User();
            u.setEmail("company@jobs.local");
            u.setPasswordHash(encoder.encode("Company@123"));
            u.setFullName("Company HR");
            u.setRoles(Set.of(rCom));
            users.save(u);
        }

        if (users.findByEmail("student1@gu.local").isEmpty()) {
            var u = new User();
            u.setEmail("student1@gu.local");
            u.setPasswordHash(encoder.encode("Student@123"));
            u.setFullName("Student One");
            u.setOrganization(gu);
            u.setRoles(Set.of(rStu));
            u = users.save(u);

            StudentProfile sp = new StudentProfile();
            sp.setUser(u);
            sp.setProgram("B.Tech");
            sp.setDepartment("CSE");
            sp.setCgpa(8.7);
            sp.setAttendancePercent(92.5);
            sp.setCreditPoints(24);
            students.save(sp);
        }
    }
}
