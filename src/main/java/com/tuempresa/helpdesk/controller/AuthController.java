package com.tuempresa.helpdesk.controller;

import com.tuempresa.helpdesk.dto.auth.AuthResponse;
import com.tuempresa.helpdesk.dto.auth.LoginRequest;
import com.tuempresa.helpdesk.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
    try {
      AuthResponse response = authService.login(request);
      return ResponseEntity.ok(response);
    } catch (IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
  }
}
