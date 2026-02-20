import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-page">
      <div className="login-overlay" />

      <div className="login-shell">
        <aside className="login-brand-panel card">
          <h1>Helpdesk GLPI</h1>
          <p>Plataforma de soporte técnico, gestión de tickets y administración de usuarios.</p>
          <ul>
            <li>✔ Seguimiento de SLA</li>
            <li>✔ Control de estados y prioridades</li>
            <li>✔ Seguridad con Supabase Auth</li>
          </ul>
        </aside>

        <form className="card login-card" onSubmit={onSubmit}>
          <h2>Iniciar sesión</h2>
          <p className="text-muted">Accede con tu cuenta de Supabase</p>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu-correo@empresa.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          {error && <p className="alert error">{error}</p>}
        </form>
      </div>
    </section>
  );
}
