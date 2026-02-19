package com.tuempresa.helpdesk.service;

import com.tuempresa.helpdesk.dto.CreateTicketDTO;
import com.tuempresa.helpdesk.dto.TicketDTO;
import com.tuempresa.helpdesk.model.Ticket;
import com.tuempresa.helpdesk.repository.TicketRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {
  private final TicketRepository repo;

  public TicketService(TicketRepository repo) {
    this.repo = repo;
  }

  public TicketDTO create(CreateTicketDTO dto) {
    Ticket t = new Ticket();
    t.setTitle(dto.getTitle());
    t.setDescription(dto.getDescription());
    t.setCreatedAt(LocalDateTime.now());
    t.setStatus(Ticket.Status.OPEN);
    return TicketDTO.from(repo.save(t));
  }

  public List<TicketDTO> findAll() {
    return repo.findAll().stream().map(TicketDTO::from).collect(Collectors.toList());
  }

  public TicketDTO findById(Long id) {
    return repo.findById(id).map(TicketDTO::from).orElse(null);
  }

  public TicketDTO updateStatus(Long id, Ticket.Status status) {
    Ticket t = repo.findById(id).orElse(null);
    if (t == null) return null;
    t.setStatus(status);
    return TicketDTO.from(repo.save(t));
  }
}
