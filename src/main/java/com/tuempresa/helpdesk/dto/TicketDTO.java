package com.tuempresa.helpdesk.dto;

import com.tuempresa.helpdesk.model.Ticket;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TicketDTO {
  private Long id;
  private String title;
  private String description;
  private String status;
  private String priority;
  private String category;
  private String requester;
  private String assignee;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private LocalDateTime firstResponseDueAt;
  private LocalDateTime resolutionDueAt;

  public static TicketDTO from(Ticket t) {
    TicketDTO dto = new TicketDTO();
    dto.setId(t.getId());
    dto.setTitle(t.getTitle());
    dto.setDescription(t.getDescription());
    dto.setStatus(t.getStatus() != null ? t.getStatus().name() : null);
    dto.setPriority(t.getPriority() != null ? t.getPriority().name() : null);
    dto.setCategory(t.getCategory() != null ? t.getCategory().name() : null);
    dto.setRequester(t.getRequester());
    dto.setAssignee(t.getAssignee());
    dto.setCreatedAt(t.getCreatedAt());
    dto.setUpdatedAt(t.getUpdatedAt());
    dto.setFirstResponseDueAt(t.getFirstResponseDueAt());
    dto.setResolutionDueAt(t.getResolutionDueAt());
    return dto;
  }
}
