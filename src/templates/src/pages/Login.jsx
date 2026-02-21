import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveAuth } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      setLoading(true);
      const data = await login(email, password);
      saveAuth(data);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  }
    console.log("¡ESTOY EN EL LOGIN CORRECTO!");
  return (
    // Usamos !bg-slate-950 para forzar el color de fondo sobre el global
    <div className="!fixed !inset-0 !m-0 !p-0 !w-full !h-full !flex !items-center !justify-center !bg-[#0f172a] !z-[9999]">

      <div className="flex flex-col md:flex-row w-full max-w-4xl mx-4 bg-[#1e293b] rounded-2xl shadow-2xl overflow-hidden border border-slate-800">

        {/* PANEL IZQUIERDO: TEXTO (Se oculta en móvil para parecerse más a la foto) */}
        <div className="hidden md:flex md:w-1/2 p-12 flex-col justify-center bg-[#0f172a]/50">
          <h1 className="text-3xl font-bold text-white mb-4 !border-none">PRUEBA</h1>
          <p className="text-slate-400 text-sm mb-8 leading-relaxed">
            Plataforma de soporte técnico, gestión de tickets y administración de usuarios.
          </p>
          <ul className="space-y-3 text-sm text-slate-300">
            <li className="flex items-center">✔ Seguimiento de SLA</li>
            <li className="flex items-center">✔ Control de estados y prioridades</li>
            <li className="flex items-center">✔ Seguridad con Supabase Auth</li>
          </ul>
        </div>

        {/* PANEL DERECHO: FORMULARIO BLANCO */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 !m-0">Iniciar sesión</h2>
            <p className="text-slate-500 text-sm mt-1">Accede con tu cuenta de Supabase</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@empresa.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="!w-fit !bg-indigo-600 hover:!bg-indigo-700 text-white px-8 py-2 rounded font-medium transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded text-center">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}