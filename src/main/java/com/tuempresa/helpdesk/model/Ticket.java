package com.tuempresa.helpdesk.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
public class Ticket {
  @Id
  @GeneratedValue
  @UuidGenerator
  private UUID id;

  @Column(nullable = false, length = 200)
  private String title;

  @Column(nullable = false, length = 2000)
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, columnDefinition = "ticket_status")
  private Status status = Status.NEW;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, columnDefinition = "ticket_priority")
  private Priority priority = Priority.MEDIUM;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, columnDefinition = "ticket_category")
  private Category category = Category.GENERAL_SUPPORT;

  @Column(name = "requester_id")
  private UUID requesterId;

  @Column(name = "assignee_id")
  private UUID assigneeId;

  @Column(length = 120)
  private String requester;

  @Column(length = 120)
  private String assignee;

  @Column(nullable = false)
  private OffsetDateTime createdAt = OffsetDateTime.now();

  @Column(nullable = false)
  private OffsetDateTime updatedAt = OffsetDateTime.now();

  private OffsetDateTime firstResponseDueAt;

  private OffsetDateTime resolutionDueAt;

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
