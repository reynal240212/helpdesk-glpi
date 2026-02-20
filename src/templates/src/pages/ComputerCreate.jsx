import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../api/supabaseClient';

export default function ComputerCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre_equipo: '',
    marca: '',
    modelo: '',
    serial_equipo: '',
    ubicacion: '',
    direccion_ip: '',
    tipo: 'Micro Torre',
    centro_investigacion: 'CENTRO DE INVESTIGACION'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.from('computers').insert([form]);

    if (error) {
      setError(error.message);
    } else {
      navigate('/computers');
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>➕ Registrar equipo</h1>

      {error && <div className="alert error">{error}</div>}

      <form className="form card" onSubmit={handleSubmit}>
        <input name="nombre_equipo" placeholder="Nombre del equipo" onChange={handleChange} required />
        <input name="marca" placeholder="Marca" onChange={handleChange} />
        <input name="modelo" placeholder="Modelo" onChange={handleChange} />
        <input name="serial_equipo" placeholder="Serial" onChange={handleChange} />
        <input name="ubicacion" placeholder="Ubicación" onChange={handleChange} />
        <input name="direccion_ip" placeholder="IP" onChange={handleChange} />

        <button className="btn-primary" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar equipo'}
        </button>
      </form>
    </div>
  );
}