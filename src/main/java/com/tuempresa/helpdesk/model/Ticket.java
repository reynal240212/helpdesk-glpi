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

  private String title;
  private String description;

  @Enumerated(EnumType.STRING)
  private Status status = Status.OPEN;

  private LocalDateTime createdAt = LocalDateTime.now();

  public enum Status {
    OPEN, IN_PROGRESS, CLOSED
  }
}
