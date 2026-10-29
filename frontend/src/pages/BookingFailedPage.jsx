import React from 'react';

export default function BookingFailedPage({
  mensajeError,
  onReintentar,
  onVolverInicio
}) {
  return (
    <div className="container py-5 text-light">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card bg-dark border-danger border-2 shadow-lg p-4 text-center">
            {/* Ícono de advertencia */}
            <div className="mb-3">
              <span className="badge bg-danger rounded-circle p-3 shadow">
                <i className="bi bi-x-circle display-4 text-white"></i>
              </span>
            </div>

            <span className="badge bg-danger text-white px-3 py-2 fw-bold text-uppercase mx-auto mb-2">
              No Se Pudo Confirmar la Reserva
            </span>
            <h2 className="fw-bold text-white mb-3">OCURRIÓ UN INCONVENIENTE</h2>
            
            <div className="alert alert-dark border-danger text-start p-3 mb-4">
              <p className="text-danger fw-bold mb-1">
                <i className="bi bi-exclamation-octagon-fill me-2"></i>
                Detalle del motivo:
              </p>
              <p className="text-secondary small m-0">
                {mensajeError || 'El bloque horario seleccionado acaba de ser reservado por otro cliente o hubo un problema momentáneo de sincronización con el servidor.'}
              </p>
            </div>

            <p className="text-secondary small mb-4">
              No te preocupes, puedes volver al paso de agendamiento para elegir un horario alternativo o comunicarte directamente con nuestra recepción telefónica.
            </p>

            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-warning text-dark fw-bold px-4"
                onClick={onReintentar}
              >
                <i className="bi bi-arrow-repeat me-1"></i> Seleccionar Otro Horario
              </button>
              <button
                type="button"
                className="btn btn-outline-light px-4"
                onClick={onVolverInicio}
              >
                <i className="bi bi-house-door me-1"></i> Ir al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
