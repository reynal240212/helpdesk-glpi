import React, { useEffect, useState } from 'react';
import { createUser, fetchUsers, getAuth } from '../api/auth';

export default function UsersAdmin() {
  const auth = getAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', fullName: '', password: '', role: 'USER' });

  async function load() {
    try {
      setError('');
      setUsers(await fetchUsers());
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => { load(); }, []);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await createUser(form);
      setForm({ email: '', fullName: '', password: '', role: 'USER' });
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  if (auth?.role !== 'SUPERADMIN') {
    return <div className="container"><p className="alert error">Solo SUPERADMIN puede gestionar usuarios.</p></div>;
  }

  return (
    <div className="container">
      <h1>Gestión de usuarios</h1>
      <form className="card" onSubmit={onSubmit}>
        <div className="row two-cols">
          <div><label>Email</label><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><label>Nombre</label><input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></div>
        </div>
        <div className="row two-cols">
          <div><label>Contraseña</label><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
          <div>
            <label>Rol</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="USER">USER</option>
              <option value="TECHNICIAN">TECHNICIAN</option>
              <option value="ADMIN">ADMIN</option>
              <option value="SUPERADMIN">SUPERADMIN</option>
            </select>
          </div>
        </div>
        <button type="submit">Crear usuario</button>
      </form>

      {error && <p className="alert error">{error}</p>}

      <div className="card" style={{ marginTop: 12 }}>
        <h3>Usuarios</h3>
        <div className="grid">
          {users.map(u => (
            <div className="card" key={u.id}>
              <strong>{u.fullName}</strong>
              <p>{u.id}</p>
              <span className="badge">{u.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
