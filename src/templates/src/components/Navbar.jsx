import React from 'react';
import { NavLink } from 'react-router-dom';

const menu = [
  { to: '/', label: 'Dashboard' },
  { to: '/create', label: 'Crear ticket' },
];

export default function Navbar({ role, fullName, onLogout }) {
  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-logo">GLPI</div>
        <div className="sidebar-section">Find menu</div>
        <nav className="sidebar-menu">
          {menu.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
              {item.label}
            </NavLink>
          ))}

          {role === 'SUPERADMIN' && (
            <NavLink to="/users" className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}>
              Usuarios
            </NavLink>
          )}
        </nav>
      </aside>

      <header className="topbar-glpi">
        <div className="topbar-left">Home</div>
        <div className="topbar-right">
          <input className="topbar-search" placeholder="Search..." />
          <div className="user-chip">{(fullName || 'AD').slice(0, 2).toUpperCase()}</div>
          <button className="btn-logout" onClick={onLogout}>Salir</button>
        </div>
      </header>
    </>
  );
}
