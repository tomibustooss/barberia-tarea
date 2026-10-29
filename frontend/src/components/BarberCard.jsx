import React from 'react';

export default function BarberCard({ barbero, onSeleccionarParaAgendar }) {
  return (
    <div className="card h-100 bg-dark text-light border-secondary text-center shadow-sm">
      <div className="pt-4 pb-2">
        <img
          src={barbero.foto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
          alt={barbero.nombre}
          className="rounded-circle border border-warning border-3 shadow"
          style={{ width: '130px', height: '130px', objectFit: 'cover' }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning fw-bold mb-1">{barbero.nombre}</h5>
        <p className="text-info small mb-2 fw-semibold">
          <i className="bi bi-award me-1"></i>
          {barbero.especialidad || 'Master Barbero'}
        </p>

        {/* Estrellas y valoración */}
        <div className="text-warning mb-2 small">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <span className="ms-2 text-white fw-bold">({barbero.calificacion || 4.9})</span>
        </div>

        <p className="card-text text-secondary small flex-grow-1">
          {barbero.bio || barbero.experiencia || 'Especialista en cortes de tendencia y afeitado tradicional.'}
        </p>

        <div className="border-top border-secondary pt-3 mt-2">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm w-100 fw-bold"
            onClick={() => onSeleccionarParaAgendar(barbero)}
          >
            <i className="bi bi-calendar-check me-1"></i> Agendar con {barbero.nombre.split(' ')[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
