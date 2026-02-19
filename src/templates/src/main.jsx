import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTicket from './pages/CreateTicket';
import './styles/globals.css';

function AppRouter() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav">
          <a href="/">Tickets</a>
          <a href="/create">Crear Ticket</a>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(<AppRouter />);
