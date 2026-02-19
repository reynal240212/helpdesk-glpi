package com.tuempresa.helpdesk.controller;

import com.tuempresa.helpdesk.dto.auth.CreateUserRequest;
import com.tuempresa.helpdesk.dto.auth.UserDTO;
import com.tuempresa.helpdesk.service.UserManagementService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserManagementController {
  private final UserManagementService userService;

  public UserManagementController(UserManagementService userService) {
    this.userService = userService;
  }

  @GetMapping
  @PreAuthorize("hasRole('SUPERADMIN')")
  public List<UserDTO> list() {
    return userService.listUsers();
  }

  @PostMapping
  @PreAuthorize("hasRole('SUPERADMIN')")
  public ResponseEntity<?> create(@Valid @RequestBody CreateUserRequest request) {
    try {
      return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(request));
    } catch (IllegalArgumentException ex) {
      return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
  }
}
