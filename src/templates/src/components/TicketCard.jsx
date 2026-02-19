import React from 'react';
import StatusBadge from './StatusBadge';

export default function TicketCard({ ticket, onChangeStatus }) {
  return (
    <div className="card">
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <div className="row">
        <StatusBadge status={ticket.status} />
        <small>{new Date(ticket.createdAt).toLocaleString()}</small>
      </div>
      <div className="row">
        <button onClick={() => onChangeStatus(ticket.id, 'OPEN')}>Open</button>
        <button onClick={() => onChangeStatus(ticket.id, 'IN_PROGRESS')}>In Progress</button>
        <button onClick={() => onChangeStatus(ticket.id, 'CLOSED')}>Closed</button>
      </div>
    </div>
  );
}
