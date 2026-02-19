package com.tuempresa.helpdesk.controller;

import com.tuempresa.helpdesk.dto.CreateTicketDTO;
import com.tuempresa.helpdesk.dto.TicketDTO;
import com.tuempresa.helpdesk.model.Ticket;
import com.tuempresa.helpdesk.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
  private final TicketService service;

  public TicketController(TicketService service) {
    this.service = service;
  }

  @PostMapping
  public ResponseEntity<TicketDTO> create(@Valid @RequestBody CreateTicketDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
  }

  @GetMapping
  public List<TicketDTO> list() {
    return service.findAll();
  }

  @GetMapping("/{id}")
  public ResponseEntity<TicketDTO> get(@PathVariable Long id) {
    TicketDTO dto = service.findById(id);
    return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
  }

  @PatchMapping("/{id}/status")
  public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam Ticket.Status status) {
    try {
      TicketDTO dto = service.updateStatus(id, status);
      return dto != null ? ResponseEntity.ok(dto) : ResponseEntity.notFound().build();
    } catch (IllegalStateException ex) {
      return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
    }
  }
}
