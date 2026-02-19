package com.tuempresa.helpdesk.service;

import com.tuempresa.helpdesk.dto.CreateTicketDTO;
import com.tuempresa.helpdesk.dto.TicketDTO;
import com.tuempresa.helpdesk.model.Ticket;
import com.tuempresa.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class TicketService {
  private final TicketRepository repo;

  private static final Map<Ticket.Status, Set<Ticket.Status>> ALLOWED_TRANSITIONS =
      new EnumMap<>(Ticket.Status.class);

  static {
    ALLOWED_TRANSITIONS.put(Ticket.Status.NEW, Set.of(Ticket.Status.IN_PROGRESS, Ticket.Status.PENDING, Ticket.Status.CLOSED));
    ALLOWED_TRANSITIONS.put(Ticket.Status.IN_PROGRESS, Set.of(Ticket.Status.PENDING, Ticket.Status.RESOLVED, Ticket.Status.CLOSED));
    ALLOWED_TRANSITIONS.put(Ticket.Status.PENDING, Set.of(Ticket.Status.IN_PROGRESS, Ticket.Status.RESOLVED, Ticket.Status.CLOSED));
    ALLOWED_TRANSITIONS.put(Ticket.Status.RESOLVED, Set.of(Ticket.Status.CLOSED, Ticket.Status.IN_PROGRESS));
    ALLOWED_TRANSITIONS.put(Ticket.Status.CLOSED, Set.of(Ticket.Status.IN_PROGRESS));
  }

  public TicketService(TicketRepository repo) {
    this.repo = repo;
  }

  public TicketDTO create(CreateTicketDTO dto) {
    Ticket t = new Ticket();
    t.setTitle(dto.getTitle().trim());
    t.setDescription(dto.getDescription().trim());

    t.setPriority(dto.getPriority() != null ? dto.getPriority() : Ticket.Priority.MEDIUM);
    t.setCategory(dto.getCategory() != null ? dto.getCategory() : Ticket.Category.GENERAL_SUPPORT);

    t.setRequester(blankToNull(dto.getRequester()));
    t.setAssignee(blankToNull(dto.getAssignee()));

    OffsetDateTime now = OffsetDateTime.now();
    t.setCreatedAt(now);
    t.setUpdatedAt(now);
    t.setStatus(Ticket.Status.NEW);

    t.setFirstResponseDueAt(now.plusHours(firstResponseHoursByPriority(t.getPriority())));
    t.setResolutionDueAt(now.plusHours(resolutionHoursByPriority(t.getPriority())));

    return TicketDTO.from(repo.save(t));
  }

  public List<TicketDTO> findAll() {
    return repo.findAll().stream().map(TicketDTO::from).collect(Collectors.toList());
  }

  public TicketDTO findById(UUID id) {
    return repo.findById(id).map(TicketDTO::from).orElse(null);
  }

  public TicketDTO updateStatus(UUID id, Ticket.Status nextStatus) {
    Ticket t = repo.findById(id).orElse(null);
    if (t == null) return null;

    Ticket.Status current = t.getStatus();
    if (current == nextStatus) return TicketDTO.from(t);

    Set<Ticket.Status> allowed = ALLOWED_TRANSITIONS.getOrDefault(current, Set.of());
    if (!allowed.contains(nextStatus)) {
      throw new IllegalStateException("Transición no permitida: " + current + " -> " + nextStatus);
    }

    t.setStatus(nextStatus);
    t.setUpdatedAt(OffsetDateTime.now());
    return TicketDTO.from(repo.save(t));
  }

  private static String blankToNull(String value) {
    if (value == null) return null;
    String v = value.trim();
    return v.isEmpty() ? null : v;
  }

  private static long firstResponseHoursByPriority(Ticket.Priority p) {
    return switch (p) {
      case CRITICAL -> 1;
      case HIGH -> 4;
      case MEDIUM -> 8;
      case LOW -> 16;
    };
  }

  private static long resolutionHoursByPriority(Ticket.Priority p) {
    return switch (p) {
      case CRITICAL -> 8;
      case HIGH -> 24;
      case MEDIUM -> 48;
      case LOW -> 72;
    };
  }
}
