import React, { useMemo, useState } from 'react';
import { createTicket } from '../api/tickets';

export default function TicketForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
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
      const created = await createTicket({ title: title.trim(), description: description.trim() });
      setOk('Ticket creado correctamente.');
      setTitle('');
      setDescription('');
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

      <div className="row">
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Guardar ticket'}</button>
      </div>

      {error && <p className="alert error">{error}</p>}
      {ok && <p className="alert success">{ok}</p>}
    </form>
  );
}
