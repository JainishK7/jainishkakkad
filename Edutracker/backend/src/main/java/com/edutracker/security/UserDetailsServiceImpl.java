package com.edutracker.security;

import com.edutracker.user.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository users;

    public UserDetailsServiceImpl(UserRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var u = users.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        var authorities = u.getRoles().stream().map(r -> new SimpleGrantedAuthority("ROLE_" + r.getName())).collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(u.getEmail(), u.getPasswordHash(), authorities);
    }
}
