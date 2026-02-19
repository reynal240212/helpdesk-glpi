package com.tuempresa.helpdesk.repository;

import com.tuempresa.helpdesk.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
