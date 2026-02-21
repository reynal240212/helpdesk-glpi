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

    if (!email || !password) {
      setError('Debes completar todos los campos.');
      return;
    }

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

  return (
    // Contenedor principal con degradado azul celeste
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E0FFFF] to-white p-4 md:p-8">

      {/* Shell del Login (Contenedor de dos paneles) */}
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden min-h-[550px]">

        {/* Panel de Marca (Izquierdo) - Se oculta en móviles muy pequeños o se apila */}
        <aside className="hidden md:flex md:w-1/2 bg-[#F9FAFB] p-12 flex-col justify-center border-r border-gray-100">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
              Helpdesk <span className="text-blue-400">GLPI</span>
            </h1>
            <p className="text-[#6B7280] text-lg leading-relaxed">
              Gestión moderna de soporte, inventario y usuarios en un solo lugar.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center text-gray-700">
                <span className="bg-[#E0FFFF] text-blue-600 p-1 rounded-full mr-3 text-xs">✔</span>
                Seguimiento de SLA
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-[#E0FFFF] text-blue-600 p-1 rounded-full mr-3 text-xs">✔</span>
                Inventario de equipos
              </li>
              <li className="flex items-center text-gray-700">
                <span className="bg-[#E0FFFF] text-blue-600 p-1 rounded-full mr-3 text-xs">✔</span>
                Seguridad con Supabase Auth
              </li>
            </ul>
          </div>
        </aside>

        {/* Formulario de Inicio de Sesión (Derecho) */}
        <form
          className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white"
          onSubmit={onSubmit}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
            <p className="text-[#6B7280] mt-2">Accede con tu cuenta corporativa</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#F9FAFB] focus:ring-2 focus:ring-[#E0FFFF] focus:border-blue-300 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu-correo@empresa.com"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#6B7280] mb-2">
                Contraseña
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-[#F9FAFB] focus:ring-2 focus:ring-[#E0FFFF] focus:border-blue-300 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#E0FFFF] hover:bg-[#FDE68A] text-blue-900 font-bold rounded-lg transition-colors duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </div>

          {/* Manejo de Errores con el color de acento rojo claro */}
          {error && (
            <div className="mt-6 p-3 bg-[#FCA5A5] bg-opacity-30 border border-[#FCA5A5] text-red-800 text-sm rounded-lg text-center animate-pulse">
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}