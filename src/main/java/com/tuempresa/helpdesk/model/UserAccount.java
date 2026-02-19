package com.tuempresa.helpdesk.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "app_users")
@Data
@NoArgsConstructor
public class UserAccount {
  @Id
  @GeneratedValue
  @UuidGenerator
  private UUID id;

  @Column(nullable = false, unique = true, length = 80)
  private String username;

  @Column(nullable = false, length = 120)
  private String fullName;

  @Column(nullable = false)
  private String passwordHash;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Role role;

  @Column(nullable = false)
  private boolean active = true;

  @Column(nullable = false)
  private OffsetDateTime createdAt = OffsetDateTime.now();

  public enum Role {
    SUPERADMIN,
    ADMIN,
    TECHNICIAN,
    USER
  }
}
