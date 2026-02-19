import React, { useEffect, useMemo, useState } from 'react';
import { fetchTickets, updateTicketStatus } from '../api/tickets';
import TicketCard from '../components/TicketCard';

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Carga inicial
  const load = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await fetchTickets();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // MEJORA: Actualización Optimista
  const handleChangeStatus = async (id, nextStatus) => {
    const originalTickets = [...tickets];

    // 1. Actualizamos UI al instante
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));

    try {
      await updateTicketStatus(id, nextStatus);
    } catch (err) {
      // 2. Si falla, revertimos y notificamos
      setTickets(originalTickets);
      setError('No se pudo actualizar el ticket. Reintentando...');
      setTimeout(() => setError(''), 3000); // Limpiar error tras 3s
    }
  };

  // Filtrado y Estadísticas (Memorizados)
  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return tickets
      .filter(t => (statusFilter === 'ALL' ? true : t.status === statusFilter))
      .filter(t => !query || `${t.title} ${t.description}`.toLowerCase().includes(query))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [tickets, search, statusFilter]);

  const stats = useMemo(() => {
    const counts = { TOTAL: tickets.length, NEW: 0, IN_PROGRESS: 0, PENDING: 0, RESOLVED: 0, CLOSED: 0 };
    tickets.forEach(t => { if (counts[t.status] !== undefined) counts[t.status]++; });
    return counts;
  }, [tickets]);

  return (
    <div className="container">
      <header className="page-header">
        <div>
          <h1>Panel de Tickets</h1>
          <p className="text-muted">Gestiona las incidencias en tiempo real</p>
        </div>
        <button className="btn-refresh" onClick={load} disabled={loading}>
          {loading ? 'Cargando...' : '🔄 Sincronizar'}
        </button>
      </header>

      {/* Grid de Estadísticas con mejor semántica */}
      <section className="stats-grid">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className={`stat-card ${statusFilter === key ? 'active' : ''}`} onClick={() => setStatusFilter(key)}>
            <span>{key.replace('_', ' ')}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </section>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="search"
            placeholder="Buscar por título o descripción..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="ALL">Todos los estados</option>
          <option value="NEW">Nuevos</option>
          <option value="IN_PROGRESS">En progreso</option>
          <option value="PENDING">Pendientes</option>
          <option value="RESOLVED">Resueltos</option>
          <option value="CLOSED">Cerrados</option>
        </select>
      </div>

      {error && <div className="alert error-toast">{error}</div>}

      <main className="grid">
        {loading && tickets.length === 0 ? (
          <p>Cargando panel...</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron resultados para tu búsqueda.</p>
          </div>
        ) : (
          filtered.map(t => (
            <TicketCard key={t.id} ticket={t} onChangeStatus={handleChangeStatus} />
          ))
        )}
      </main>
    </div>
  );
}