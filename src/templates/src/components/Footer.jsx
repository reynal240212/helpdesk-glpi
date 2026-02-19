import React from 'react';

export default function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="container footer-content">
        <span>© {new Date().getFullYear()} Helpdesk GLPI</span>
        <span>Estado: Operativo</span>
      </div>
    </footer>
  );
}
