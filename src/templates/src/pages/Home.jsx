import React, { useEffect, useState } from 'react';
import { fetchTickets, updateTicketStatus } from '../api/tickets';
import TicketCard from '../components/TicketCard';

export default function Home() {
  const [tickets, setTickets] = useState([]);

  async function load() {
    const data = await fetchTickets();
    setTickets(data);
  }

  async function handleChangeStatus(id, status) {
    await updateTicketStatus(id, status);
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <h1>Panel de Tickets</h1>
      {tickets.length === 0 ? <p>No hay tickets todavía.</p> : null}
      <div className="grid">
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} onChangeStatus={handleChangeStatus} />
        ))}
      </div>
    </div>
  );
}
