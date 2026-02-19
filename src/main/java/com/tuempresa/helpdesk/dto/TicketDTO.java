package com.tuempresa.helpdesk.dto;

import lombok.Data;

@Data
public class TicketDTO {
  private Long id;
  private String title;
  private String description;
  private String status;
  private java.time.LocalDateTime createdAt;

  public static TicketDTO from(com.tuempresa.helpdesk.model.Ticket t) {
    TicketDTO dto = new TicketDTO();
    dto.setId(t.getId());
    dto.setTitle(t.getTitle());
    dto.setDescription(t.getDescription());
    dto.setStatus(t.getStatus() != null ? t.getStatus().name() : null);
    dto.setCreatedAt(t.getCreatedAt());
    return dto;
  }
}
