package com.tuempresa.helpdesk.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "profiles", schema = "public")
@Data
@NoArgsConstructor
public class Profile {
  @Id
  private UUID id;

  private String fullName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role = Role.USER;

  @Column(nullable = false)
  private boolean active = true;

  @Column(nullable = false)
  private OffsetDateTime createdAt;

  public enum Role {
    SUPERADMIN,
    ADMIN,
    TECHNICIAN,
    USER
  }
}
