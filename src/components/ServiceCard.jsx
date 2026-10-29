import React from 'react';

function ServiceCard({ service, onSelect }) {
  return (
    <article className="card h-100 border-0 shadow-sm service-card">
      <img src={service.imagen} alt={service.nombre} className="card-img-top service-card__image" />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge text-bg-warning rounded-pill">{service.categoria}</span>
          {service.popular && <span className="small text-success fw-semibold">Popular</span>}
        </div>
        <h3 className="h5 mb-2">{service.nombre}</h3>
        <p className="text-muted flex-grow-1">{service.descripcion}</p>
        <div className="d-flex justify-content-between align-items-center">
          <strong className="text-dark">${service.precio.toLocaleString('es-CL')}</strong>
          <span className="small text-secondary">{service.duracionMinutos} min</span>
        </div>
        <button className="btn btn-dark mt-3" type="button" onClick={() => onSelect?.(service)}>
          Agendar
        </button>
      </div>
    </article>
  );
}

export default ServiceCard;
