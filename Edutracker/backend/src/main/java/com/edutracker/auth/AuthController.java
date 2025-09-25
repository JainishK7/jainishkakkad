package com.edutracker.auth;

import com.edutracker.security.JwtService;
import com.edutracker.security.UserDetailsServiceImpl;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final UserDetailsServiceImpl uds;

    public AuthController(AuthenticationManager authManager, JwtService jwtService, UserDetailsServiceImpl uds) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.uds = uds;
    }

    public record LoginRequest(@NotBlank String email, @NotBlank String password) {}
    public record TokenResponse(String token) {}

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest req) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(req.email(), req.password()));
        UserDetails user = uds.loadUserByUsername(req.email());
        String token = jwtService.generateToken(user, Map.of());
        return ResponseEntity.ok(new TokenResponse(token));
    }
}
