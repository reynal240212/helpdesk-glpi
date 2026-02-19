import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import Login from './pages/Login';
import UsersAdmin from './pages/UsersAdmin';
import { clearAuth, getAuth } from './api/auth';
import './styles/globals.css';

function PrivateRoute({ children }) {
  return getAuth()?.token ? children : <Navigate to="/login" replace />;
}

function Shell({ children }) {
  const auth = getAuth();
  return (
    <>
      <div className="container">
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Panel</NavLink>
          <NavLink to="/create" className={({ isActive }) => (isActive ? 'active' : '')}>Crear ticket</NavLink>
          {auth?.role === 'SUPERADMIN' && (
            <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Usuarios</NavLink>
          )}
          <button onClick={() => { clearAuth(); window.location.href = '#/login'; }}>Salir</button>
        </nav>
      </div>
      {children}
    </>
  );
}

function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Shell><Home /></Shell></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><Shell><CreateTicket /></Shell></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Shell><UsersAdmin /></Shell></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')).render(<AppRouter />);
