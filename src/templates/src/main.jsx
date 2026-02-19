import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import './styles/globals.css';

function AppRouter() {
  return (
    <HashRouter>
      <div className="container">
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Panel</NavLink>
          <NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>Crear ticket</NavLink>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTicket />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')).render(<AppRouter />);
