import React, { useMemo, useState } from 'react';
import { createTicket } from '../api/tickets';

export default function TicketForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [category, setCategory] = useState('GENERAL_SUPPORT');
  const [requester, setRequester] = useState('');
  const [assignee, setAssignee] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const titleLeft = useMemo(() => 120 - title.length, [title]);
  const descLeft = useMemo(() => 600 - description.length, [description]);

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setOk('');

    if (!title.trim() || !description.trim()) {
      setError('Título y descripción son obligatorios.');
      return;
    }
    if (title.length > 120 || description.length > 600) {
      setError('Superaste el límite de caracteres.');
      return;
    }

    try {
      setLoading(true);
      const created = await createTicket({
        title: title.trim(),
        description: description.trim(),
        priority,
        category,
        requester: requester.trim() || null,
        assignee: assignee.trim() || null,
      });
      setOk('Ticket creado correctamente.');
      setTitle('');
      setDescription('');
      setPriority('MEDIUM');
      setCategory('GENERAL_SUPPORT');
      setRequester('');
      setAssignee('');
      onCreated?.(created);
    } catch (err) {
      setError(err.message || 'No se pudo crear el ticket.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h2>Crear ticket</h2>

      <label>Título</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ej. Error al iniciar sesión"
        maxLength={120}
      />
      <small className="hint">{titleLeft} caracteres restantes</small>

      <label>Descripción</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe el problema, impacto, pasos para reproducir..."
        rows={5}
        maxLength={600}
      />
      <small className="hint">{descLeft} caracteres restantes</small>

      <div className="row two-cols">
        <div>
          <label>Prioridad</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="LOW">Baja</option>
            <option value="MEDIUM">Media</option>
            <option value="HIGH">Alta</option>
            <option value="CRITICAL">Crítica</option>
          </select>
        </div>
        <div>
          <label>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="GENERAL_SUPPORT">Soporte general</option>
            <option value="SOFTWARE">Software</option>
            <option value="HARDWARE">Hardware</option>
            <option value="NETWORK">Red</option>
            <option value="ACCESS">Accesos</option>
            <option value="INCIDENT">Incidente</option>
            <option value="SERVICE_REQUEST">Solicitud</option>
          </select>
        </div>
      </div>

      <div className="row two-cols">
        <div>
          <label>Solicitante</label>
          <input value={requester} onChange={(e) => setRequester(e.target.value)} placeholder="Nombre solicitante" maxLength={120} />
        </div>
        <div>
          <label>Asignado a</label>
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="Técnico asignado" maxLength={120} />
        </div>
      </div>

      <div className="row">
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar ticket'}</button>
      </div>

      {error && <p className="alert error">{error}</p>}
      {ok && <p className="alert success">{ok}</p>}
    </form>
  );
}
