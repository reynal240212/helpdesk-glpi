import React, { useState } from 'react';
import StatusBadge from './StatusBadge';

const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

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

      <div className="row between">
        <small className="hint">Creado: {new Date(ticket.createdAt).toLocaleString()}</small>
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
