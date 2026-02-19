import { supabase } from './supabase';

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

export async function clearAuth() {
  localStorage.removeItem('helpdesk_auth');
  await supabase.auth.signOut();
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session?.access_token) {
    throw new Error(error?.message || 'Login inválido');
  }

  const token = data.session.access_token;
  const me = await fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(async (r) => {
    const b = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(b.message || 'No se pudo obtener perfil');
    return b;
  });

  const auth = {
    token,
    userId: data.user.id,
    email: data.user.email,
    role: me.role,
    fullName: me.fullName,
  };
  saveAuth(auth);
  return auth;
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
