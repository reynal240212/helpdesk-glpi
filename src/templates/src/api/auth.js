const API_BASE = '/api';

export function getAuth() {
  const raw = localStorage.getItem('helpdesk_auth');
  return raw ? JSON.parse(raw) : null;
}

export function getToken() {
  return getAuth()?.token || null;
}

export function saveAuth(data) {
  localStorage.setItem('helpdesk_auth', JSON.stringify(data));
}

export function clearAuth() {
  localStorage.removeItem('helpdesk_auth');
}

export async function login(username, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || 'Login inválido');

  saveAuth(body);
  return body;
}

export async function fetchUsers() {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const body = await res.json().catch(() => []);
  if (!res.ok) throw new Error(body.message || 'Error al cargar usuarios');
  return body;
}

export async function createUser(payload) {
  const token = getToken();
  const res = await fetch(`${API_BASE}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || 'Error al crear usuario');
  return body;
}
