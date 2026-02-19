import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

const STATUS_OPTIONS = ['NEW', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED'];

export default function TicketCard({ ticket, onChangeStatus }) {
  const [saving, setSaving] = useState(false);

  async function handleStatusChange(status) {
    if (status === ticket.status) return;
    setSaving(true);
    try {
      await onChangeStatus(ticket.id, status);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="card ticket-card">
      <header className="row between">
        <h3 className="ticket-title">#{ticket.id} · {ticket.title}</h3>
        <StatusBadge status={ticket.status} />
      </header>

      <p className="ticket-description">{ticket.description}</p>

      <div className="row meta-wrap">
        <small className="hint"><strong>Prioridad:</strong> {ticket.priority || 'MEDIUM'}</small>
        <small className="hint"><strong>Categoría:</strong> {ticket.category || 'GENERAL_SUPPORT'}</small>
        <small className="hint"><strong>Solicitante:</strong> {ticket.requester || 'N/A'}</small>
        <small className="hint"><strong>Asignado:</strong> {ticket.assignee || 'Sin asignar'}</small>
      </div>

      <div className="row between">
        <small className="hint">Creado: {new Date(ticket.createdAt).toLocaleString()}</small>
        <small className="hint">SLA Resolución: {ticket.resolutionDueAt ? new Date(ticket.resolutionDueAt).toLocaleString() : 'N/A'}</small>
        <div className="row">
          <select
            value={ticket.status}
            disabled={saving}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </article>
  );
}
