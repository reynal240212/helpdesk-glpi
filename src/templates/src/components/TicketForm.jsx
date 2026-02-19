import React, { useState } from 'react';
import { createTicket } from '../api/tickets';

export default function TicketForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    await createTicket({ title, description });
    setMsg('Ticket creado correctamente.');
    setTitle('');
    setDescription('');
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Crear ticket</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
      <button type="submit">Guardar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
