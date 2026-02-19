package com.tuempresa.helpdesk.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
public class Ticket {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, length = 200)
  private String title;

  @Column(nullable = false, length = 2000)
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Status status = Status.NEW;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 20)
  private Priority priority = Priority.MEDIUM;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 50)
  private Category category = Category.GENERAL_SUPPORT;

  @Column(length = 120)
  private String requester;

  @Column(length = 120)
  private String assignee;

  @Column(nullable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  private LocalDateTime updatedAt;

  private LocalDateTime firstResponseDueAt;

  private LocalDateTime resolutionDueAt;

  public enum Status {
    NEW,
    IN_PROGRESS,
    PENDING,
    RESOLVED,
    CLOSED
  }

  public enum Priority {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
  }

  public enum Category {
    HARDWARE,
    SOFTWARE,
    NETWORK,
    ACCESS,
    INCIDENT,
    SERVICE_REQUEST,
    GENERAL_SUPPORT
  }
}
