import { getToken } from './auth';

const API_BASE = '/api';

async function request(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const token = getToken();
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    const isJson = res.headers.get('content-type')?.includes('application/json');
    const body = isJson ? await res.json() : null;

    if (!res.ok) {
      const msg = body?.message || `Error HTTP ${res.status}`;
      throw new Error(msg);
    }

    return body;
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error('Tiempo de espera agotado. Verifica conexión con el backend.');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export function fetchTickets() {
  return request(`${API_BASE}/tickets`, { method: 'GET' });
}

export function createTicket(payload) {
  return request(`${API_BASE}/tickets`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTicketStatus(id, status) {
  return request(`${API_BASE}/tickets/${id}/status?status=${encodeURIComponent(status)}`, {
    method: 'PATCH',
  });
}
