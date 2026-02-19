const API_BASE = 'http://localhost:8080/api';

export async function fetchTickets() {
  const r = await fetch(`${API_BASE}/tickets`);
  if (!r.ok) throw new Error('No se pudieron cargar tickets');
  return r.json();
}

export async function createTicket(payload) {
  const r = await fetch(`${API_BASE}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('No se pudo crear ticket');
  return r.json();
}

export async function updateTicketStatus(id, status) {
  const r = await fetch(`${API_BASE}/tickets/${id}/status?status=${status}`, {
    method: 'PATCH',
  });
  if (!r.ok) throw new Error('No se pudo actualizar el estado');
  return r.json();
}
