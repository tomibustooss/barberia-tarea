import React from 'react';

function BarberCard({ barber }) {
  return (
    <article className="card h-100 border-0 shadow-sm barber-card">
      <img src={barber.foto} alt={barber.nombre} className="card-img-top barber-card__image" />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h3 className="h5 mb-0">{barber.nombre}</h3>
          <span className="badge text-bg-light text-warning">★ {barber.calificacion}</span>
        </div>
        <p className="text-muted mb-1">{barber.especialidad}</p>
        <p className="small text-secondary mb-2">{barber.experiencia}</p>
        <p className="mb-0">{barber.descripcion}</p>
      </div>
    </article>
  );
}

export default BarberCard;
