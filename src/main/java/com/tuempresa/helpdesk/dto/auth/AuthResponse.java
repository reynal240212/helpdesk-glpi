package com.tuempresa.helpdesk.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
  private String token;
  private String username;
  private String role;
  private String fullName;
}
