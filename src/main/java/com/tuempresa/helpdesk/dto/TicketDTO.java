package com.tuempresa.helpdesk.dto;

import com.tuempresa.helpdesk.model.Ticket;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.UUID;

@Data
public class TicketDTO {
  private UUID id;
  private String title;
  private String description;
  private String status;
  private String priority;
  private String category;
  private UUID requesterId;
  private UUID assigneeId;
  private String requester;
  private String assignee;
  private OffsetDateTime createdAt;
  private OffsetDateTime updatedAt;
  private OffsetDateTime firstResponseDueAt;
  private OffsetDateTime resolutionDueAt;

  public static TicketDTO from(Ticket t) {
    TicketDTO dto = new TicketDTO();
    dto.setId(t.getId());
    dto.setTitle(t.getTitle());
    dto.setDescription(t.getDescription());
    dto.setStatus(t.getStatus() != null ? t.getStatus().name() : null);
    dto.setPriority(t.getPriority() != null ? t.getPriority().name() : null);
    dto.setCategory(t.getCategory() != null ? t.getCategory().name() : null);
    dto.setRequesterId(t.getRequesterId());
    dto.setAssigneeId(t.getAssigneeId());
    dto.setRequester(t.getRequester());
    dto.setAssignee(t.getAssignee());
    dto.setCreatedAt(t.getCreatedAt());
    dto.setUpdatedAt(t.getUpdatedAt());
    dto.setFirstResponseDueAt(t.getFirstResponseDueAt());
    dto.setResolutionDueAt(t.getResolutionDueAt());
    return dto;
  }
}
