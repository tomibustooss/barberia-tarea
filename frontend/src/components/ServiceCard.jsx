import React from 'react';

export default function ServiceCard({ servicio, onVerDetalle, onAgendar }) {
  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="card h-100 bg-dark text-light border-secondary shadow-sm hover-shadow transition-all">
      {/* Imagen del servicio */}
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={servicio.imagen || 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'}
          className="card-img-top w-100 h-100 object-fit-cover"
          alt={servicio.nombre}
        />
        {servicio.destacado && (
          <span className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark fw-bold">
            <i className="bi bi-star-fill me-1"></i> Popular
          </span>
        )}
        <span className="position-absolute bottom-0 start-0 m-2 badge bg-dark bg-opacity-75 border border-secondary text-warning">
          <i className="bi bi-clock me-1"></i> {servicio.duracionMinutos || 30} min
        </span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge bg-secondary text-uppercase small">
            {servicio.categoria || 'Servicio General'}
          </span>
        </div>
        <h5 className="card-title text-warning fw-bold">{servicio.nombre}</h5>
        <p className="card-text text-secondary small flex-grow-1">
          {servicio.descripcion || 'Servicio profesional de peluquería y cuidado personal masculino.'}
        </p>

        {/* Precio */}
        <div className="d-flex justify-content-between align-items-center my-3 pt-2 border-top border-secondary">
          <span className="text-muted small">Valor Servicio:</span>
          <span className="fs-5 fw-bold text-success">
            {formatearPrecio(servicio.precio)}
          </span>
        </div>

        {/* Acciones */}
        <div className="d-grid gap-2 d-sm-flex">
          <button
            type="button"
            className="btn btn-outline-light btn-sm flex-fill"
            onClick={() => onVerDetalle(servicio)}
          >
            <i className="bi bi-eye me-1"></i> Ver Detalle
          </button>
          <button
            type="button"
            className="btn btn-warning btn-sm text-dark fw-bold flex-fill"
            onClick={() => onAgendar(servicio)}
          >
            <i className="bi bi-calendar-check me-1"></i> Agendar
          </button>
        </div>
      </div>
    </div>
  );
}
