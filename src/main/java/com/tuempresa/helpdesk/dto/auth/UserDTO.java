package com.tuempresa.helpdesk.dto.auth;

import com.tuempresa.helpdesk.model.Profile;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class UserDTO {
  private UUID id;
  private String fullName;
  private String role;
  private boolean active;
  private OffsetDateTime createdAt;

  public static UserDTO from(Profile p) {
    UserDTO dto = new UserDTO();
    dto.setId(p.getId());
    dto.setFullName(p.getFullName());
    dto.setRole(p.getRole().name());
    dto.setActive(p.isActive());
    dto.setCreatedAt(p.getCreatedAt());
    return dto;
  }
}
