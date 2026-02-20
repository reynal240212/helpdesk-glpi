import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import Login from './pages/Login';
import UsersAdmin from './pages/UsersAdmin';

/* 💻 IMPORTS INVENTARIO */
import ComputersList from './pages/ComputersList';
import ComputerCreate from './pages/ComputerCreate';
import ComputerDetail from './pages/ComputerDetail';     // 👈 nueva
import ComputerEdit from './pages/ComputerEdit';         // 👈 nueva

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { clearAuth, getAuth } from './api/auth';

import './styles/globals.css';

/* =========================
   🔐 Private Route
========================= */
function PrivateRoute({ children }) {
  return getAuth()?.token ? children : <Navigate to="/login" replace />;
}

/* =========================
   🧱 Shell Layout
========================= */
function Shell({ children }) {
  const auth = getAuth();

  const handleLogout = async () => {
    await clearAuth();
    window.location.href = '#/login';
  };

  return (
    <div className="app-shell">
      <Navbar role={auth?.role} fullName={auth?.fullName} onLogout={handleLogout} />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}

/* =========================
   🚀 Router
========================= */
function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        {/* 🔓 Public */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 Private */}
        <Route path="/" element={<PrivateRoute><Shell><Home /></Shell></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><Shell><CreateTicket /></Shell></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Shell><UsersAdmin /></Shell></PrivateRoute>} />

        {/* 💻 COMPUTERS */}
        <Route path="/computers" element={<PrivateRoute><Shell><ComputersList /></Shell></PrivateRoute>} />
        <Route path="/computers/create" element={<PrivateRoute><Shell><ComputerCreate /></Shell></PrivateRoute>} />

        {/* ⭐ NUEVAS RUTAS */}
        <Route path="/computers/:id" element={<PrivateRoute><Shell><ComputerDetail /></Shell></PrivateRoute>} />
        <Route path="/computers/edit/:id" element={<PrivateRoute><Shell><ComputerEdit /></Shell></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

createRoot(document.getElementById('root')).render(<AppRouter />);