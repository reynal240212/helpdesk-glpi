import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import Login from './pages/Login';
import UsersAdmin from './pages/UsersAdmin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { clearAuth, getAuth } from './api/auth';
import './styles/globals.css';

function PrivateRoute({ children }) {
  return getAuth()?.token ? children : <Navigate to="/login" replace />;
}

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
