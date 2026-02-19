import React from 'react';

const LABELS = {
  NEW: 'Nuevo',
  IN_PROGRESS: 'En progreso',
  PENDING: 'Pendiente',
  RESOLVED: 'Resuelto',
  CLOSED: 'Cerrado',
};

export default function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABELS[status] || status}</span>;
}
