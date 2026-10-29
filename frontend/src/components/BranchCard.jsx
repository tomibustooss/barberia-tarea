import React from 'react';

export default function BranchCard({ sucursal, onAgendarEnSucursal }) {
  return (
    <div className="card h-100 bg-dark text-light border-secondary shadow-sm">
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <img
          src={sucursal.imagen || 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=600&q=80'}
          alt={sucursal.nombre}
          className="w-100 h-100 object-fit-cover"
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-warning fw-bold">{sucursal.nombre}</h5>
        
        <p className="text-secondary small mb-2">
          <i className="bi bi-geo-alt text-warning me-2"></i>
          {sucursal.direccion}
        </p>

        <p className="text-secondary small mb-2">
          <i className="bi bi-telephone text-warning me-2"></i>
          {sucursal.telefono}
        </p>

        <p className="text-secondary small mb-3">
          <i className="bi bi-clock text-warning me-2"></i>
          {sucursal.horario || 'Lunes a Sábado: 10:00 - 20:00 hrs'}
        </p>

        <div className="mt-auto pt-2 border-top border-secondary">
          <button
            type="button"
            className="btn btn-outline-warning btn-sm w-100 fw-bold"
            onClick={() => onAgendarEnSucursal(sucursal)}
          >
            <i className="bi bi-calendar-event me-1"></i> Reservar en este Local
          </button>
        </div>
      </div>
    </div>
  );
}
