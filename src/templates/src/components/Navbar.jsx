import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar({ role, onLogout }) {
  return (
    <header className="topbar-wrap">
      <div className="container topbar">
        <div className="brand">
          <span className="brand-dot" />
          <strong>Helpdesk GLPI</strong>
        </div>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Panel</NavLink>
          <NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>Crear ticket</NavLink>
          {role === 'SUPERADMIN' && (
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Usuarios</NavLink>
          )}
        </nav>

        <button className="btn-logout" onClick={onLogout}>Salir</button>
      </div>
    </header>
  );
}
