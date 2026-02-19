package com.tuempresa.helpdesk.controller;

import com.tuempresa.helpdesk.dto.auth.CreateUserRequest;
import com.tuempresa.helpdesk.dto.auth.UserDTO;
import com.tuempresa.helpdesk.model.Profile;
import com.tuempresa.helpdesk.repository.ProfileRepository;
import com.tuempresa.helpdesk.service.UserManagementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {
  private final UserManagementService userService;
  private final ProfileRepository profileRepo;

  public UserManagementController(UserManagementService userService, ProfileRepository profileRepo) {
    this.userService = userService;
    this.profileRepo = profileRepo;
  }

  @GetMapping("/me")
  public ResponseEntity<?> me(@AuthenticationPrincipal Jwt jwt) {
    if (jwt == null || jwt.getSubject() == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "No autenticado"));
    }
    try {
      UUID id = UUID.fromString(jwt.getSubject());
      return profileRepo.findById(id)
          .map(p -> ResponseEntity.ok(UserDTO.from(p)))
          .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Perfil no encontrado")));
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(Map.of("message", "Token inválido"));
    }
  }

  @GetMapping
  public ResponseEntity<?> list(@AuthenticationPrincipal Jwt jwt) {
    if (!isSuperAdmin(jwt)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Solo SUPERADMIN"));
    }
    List<UserDTO> users = userService.listUsers();
    return ResponseEntity.ok(users);
  }

  @PostMapping
  public ResponseEntity<?> create(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody CreateUserRequest request) {
    if (!isSuperAdmin(jwt)) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", "Solo SUPERADMIN"));
    }
    try {
      return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
    } catch (IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
  }

  private boolean isSuperAdmin(Jwt jwt) {
    if (jwt == null || jwt.getSubject() == null) return false;
    UUID id;
    try {
      id = UUID.fromString(jwt.getSubject());
    } catch (Exception e) {
      return false;
    }
    return profileRepo.findById(id)
        .map(p -> p.getRole() == Profile.Role.SUPERADMIN && p.isActive())
        .orElse(false);
  }
}
