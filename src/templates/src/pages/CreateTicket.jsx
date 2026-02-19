import React from 'react';
import { Link } from 'react-router-dom';
import TicketForm from '../components/TicketForm';

export default function CreateTicket() {
  return (
    <div className="container">
      <header className="page-header">
        <h1>Nuevo Ticket</h1>
        <Link className="link-btn" to="/">Volver al panel</Link>
      </header>
      <TicketForm />
    </div>
  );
}
