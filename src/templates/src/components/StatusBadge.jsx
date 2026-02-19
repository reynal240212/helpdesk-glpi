import React from 'react';

const colors = {
  OPEN: '#16a34a',
  IN_PROGRESS: '#f59e0b',
  CLOSED: '#64748b',
};

export default function StatusBadge({ status }) {
  return (
    <span className="badge" style={{ backgroundColor: colors[status] || '#64748b' }}>
      {status}
    </span>
  );
}
