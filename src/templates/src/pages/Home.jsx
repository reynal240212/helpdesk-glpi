import React, { useEffect, useMemo, useState } from 'react';
import { fetchTickets, updateTicketStatus } from '../api/tickets';
import TicketCard from '../components/TicketCard';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ALL');

  async function load() {
    setError('');
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar tickets');
    } finally {
      setLoading(false);
    }
  }

  async function handleChangeStatus(id, nextStatus) {
    try {
      await updateTicketStatus(id, nextStatus);
      await load();
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el estado');
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets
      .filter((t) => (status === 'ALL' ? true : t.status === status))
      .filter((t) => {
        if (!q) return true;
        return `${t.title} ${t.description}`.toLowerCase().includes(q);
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tickets, search, status]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'OPEN').length,
    progress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
    closed: tickets.filter((t) => t.status === 'CLOSED').length,
  }), [tickets]);

  return (
    <div className="container">
      <header className="page-header">
        <h1>Panel de Tickets</h1>
        <button onClick={load} disabled={loading}>{loading ? 'Actualizando...' : 'Actualizar'}</button>
      </header>

      <section className="stats-grid">
        <div className="stat-card"><span>Total</span><strong>{stats.total}</strong></div>
        <div className="stat-card"><span>Abiertos</span><strong>{stats.open}</strong></div>
        <div className="stat-card"><span>En progreso</span><strong>{stats.progress}</strong></div>
        <div className="stat-card"><span>Cerrados</span><strong>{stats.closed}</strong></div>
      </section>

      <section className="card filters">
        <input
          placeholder="Buscar por título o descripción..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="ALL">Todos</option>
          <option value="OPEN">Abiertos</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="CLOSED">Cerrados</option>
        </select>
      </section>

      {error && <p className="alert error">{error}</p>}
      {loading && <p className="hint">Cargando tickets...</p>}

      {!loading && filtered.length === 0 ? (
        <div className="card empty-state">
          <h3>No hay tickets para mostrar</h3>
          <p>Crea un ticket nuevo o ajusta los filtros.</p>
        </div>
      ) : null}

      <section className="grid">
        {filtered.map((t) => (
          <TicketCard key={t.id} ticket={t} onChangeStatus={handleChangeStatus} />
        ))}
      </section>
    </div>
  );
}
