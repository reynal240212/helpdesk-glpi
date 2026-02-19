package com.tuempresa.helpdesk.dto.auth;

import com.tuempresa.helpdesk.model.UserAccount;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class UserDTO {
  private UUID id;
  private String username;
  private String fullName;
  private String role;
  private boolean active;
  private OffsetDateTime createdAt;

  public static UserDTO from(UserAccount u) {
    UserDTO dto = new UserDTO();
    dto.setId(u.getId());
    dto.setUsername(u.getUsername());
    dto.setFullName(u.getFullName());
    dto.setRole(u.getRole().name());
    dto.setActive(u.isActive());
    dto.setCreatedAt(u.getCreatedAt());
    return dto;
  }
}
