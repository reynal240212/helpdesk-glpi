package com.tuempresa.helpdesk.dto;

import com.tuempresa.helpdesk.model.Ticket;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateTicketDTO {
  @NotBlank
  @Size(max = 200)
  private String title;

  @NotBlank
  @Size(max = 2000)
  private String description;

  private Ticket.Priority priority;

  private Ticket.Category category;

  @Size(max = 120)
  private String requester;

  @Size(max = 120)
  private String assignee;
}
