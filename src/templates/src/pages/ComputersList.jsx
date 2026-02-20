import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

export default function ComputersList() {
  const [computers, setComputers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');

    const { data, error } = await supabase
      .from('computers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setComputers(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container">
      <header className="page-header">
        <h1>💻 Inventario de equipos</h1>
        <Link to="/computers/create" className="btn-primary">
          + Registrar equipo
        </Link>
      </header>

      {loading && <p>Cargando equipos...</p>}
      {error && <div className="alert error">{error}</div>}

      {!loading && computers.length === 0 && (
        <div className="card empty-state">
          <p>No hay equipos registrados.</p>
        </div>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Serial</th>
            <th>Ubicación</th>
            <th>IP</th>
          </tr>
        </thead>
        <tbody>
          {computers.map((c) => (
            <tr key={c.id}>
              <td>{c.nombre_equipo}</td>
              <td>{c.marca}</td>
              <td>{c.modelo}</td>
              <td>{c.serial_equipo}</td>
              <td>{c.ubicacion}</td>
              <td>{c.direccion_ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}