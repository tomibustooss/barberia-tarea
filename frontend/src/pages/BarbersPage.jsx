import React, { useState } from 'react';
import BarberCard from '../components/BarberCard';

export default function BarbersPage({ barberos, onAgendarConBarbero }) {
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('Todas');

  const especialidades = ['Todas', 'Degradados Fade', 'Barbas Clásicas', 'Tijera Clásica'];

  const barberosFiltrados = barberos.filter(b => {
    if (filtroEspecialidad === 'Todas') return true;
    return b.especialidad && b.especialidad.toLowerCase().includes(filtroEspecialidad.toLowerCase());
  });

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <span className="text-warning text-uppercase fw-bold small">Profesionales Calificados</span>
        <h1 className="display-5 fw-bold text-white">NUESTRO EQUIPO DE BARBEROS</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          Contamos con barberos de amplia trayectoria y formación continua. Cada profesional domina técnicas avanzadas de visagismo, corte clásico a tijera y afeitado tradicional.
        </p>
      </div>

      {/* Filtro por especialidad */}
      <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
        {especialidades.map(esp => (
          <button
            key={esp}
            className={`btn btn-sm ${filtroEspecialidad === esp ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
            onClick={() => setFiltroEspecialidad(esp)}
          >
            {esp}
          </button>
        ))}
      </div>

      {/* Grilla de barberos */}
      <div className="row g-4">
        {barberosFiltrados.map(barbero => (
          <div key={barbero.id} className="col-lg-4 col-md-6">
            <BarberCard
              barbero={barbero}
              onSeleccionarParaAgendar={onAgendarConBarbero}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
