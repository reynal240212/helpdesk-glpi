import React, { useEffect, useMemo, useState } from 'react';
import { fetchTickets, updateTicketStatus } from '../api/tickets';
import TicketCard from '../components/TicketCard';

const STATUS_TABS = ['ALL', 'NEW', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED'];

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChangeStatus = async (id, nextStatus) => {
    const backup = [...tickets];
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t)));
    try {
      await updateTicketStatus(id, nextStatus);
    } catch (err) {
      setTickets(backup);
      setError('No se pudo actualizar el estado del ticket.');
    }
  };

  const stats = useMemo(() => {
    const base = { TOTAL: tickets.length, NEW: 0, IN_PROGRESS: 0, PENDING: 0, RESOLVED: 0, CLOSED: 0 };
    let overdue = 0;
    let critical = 0;

    tickets.forEach((t) => {
      if (base[t.status] !== undefined) base[t.status]++;
      if (t.priority === 'CRITICAL' || t.priority === 'HIGH') critical++;
      if (t.resolutionDueAt && ['NEW', 'IN_PROGRESS', 'PENDING'].includes(t.status)) {
        if (new Date(t.resolutionDueAt).getTime() < Date.now()) overdue++;
      }
    });

    return { ...base, OVERDUE: overdue, HIGH_IMPACT: critical };
  }, [tickets]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return tickets
      .filter((t) => (statusFilter === 'ALL' ? true : t.status === statusFilter))
      .filter((t) => !q || `${t.title} ${t.description} ${t.requester || ''} ${t.assignee || ''}`.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tickets, search, statusFilter]);

  return (
    <div className="container">
      <header className="page-header">
        <div>
          <h1>Panel de Tickets</h1>
          <p className="text-muted">Monitorea estado, SLA y carga operativa en tiempo real.</p>
        </div>
        <button className="btn-refresh" onClick={load} disabled={loading}>
          {loading ? 'Sincronizando...' : 'Sincronizar'}
        </button>
      </header>

      <section className="kpi-grid">
        <div className="stat-card emphasis"><span>Total</span><strong>{stats.TOTAL}</strong></div>
        <div className="stat-card clickable" onClick={() => setStatusFilter('NEW')}><span>Nuevos</span><strong>{stats.NEW}</strong></div>
        <div className="stat-card clickable" onClick={() => setStatusFilter('IN_PROGRESS')}><span>En progreso</span><strong>{stats.IN_PROGRESS}</strong></div>
        <div className="stat-card clickable" onClick={() => setStatusFilter('PENDING')}><span>Pendientes</span><strong>{stats.PENDING}</strong></div>
        <div className="stat-card"><span>Alta/Crítica</span><strong>{stats.HIGH_IMPACT}</strong></div>
        <div className={`stat-card ${stats.OVERDUE > 0 ? 'danger' : ''}`}><span>Vencidos SLA</span><strong>{stats.OVERDUE}</strong></div>
      </section>

      <section className="toolbar card">
        <div className="search-box">
          <input
            type="search"
            placeholder="Buscar por título, descripción, solicitante o asignado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          {STATUS_TABS.map((s) => (
            <option key={s} value={s}>{s === 'ALL' ? 'Todos los estados' : s}</option>
          ))}
        </select>
      </section>

      <div className="chips-row">
        {STATUS_TABS.map((s) => (
          <button
            key={s}
            className={`chip ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <div className="alert error error-toast">{error}</div>}

      <main className="grid" style={{ marginTop: 10 }}>
        {loading && tickets.length === 0 ? (
          <div className="card empty-state"><p>Cargando panel...</p></div>
        ) : filtered.length === 0 ? (
          <div className="card empty-state">
            <h3>Sin resultados</h3>
            <p>No hay tickets con ese filtro. Prueba cambiando estado o búsqueda.</p>
          </div>
        ) : (
          filtered.map((t) => <TicketCard key={t.id} ticket={t} onChangeStatus={handleChangeStatus} />)
        )}
      </main>
    </div>
  );
}
