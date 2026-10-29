import React from 'react';

export default function ServiceDetailPage({
  servicio,
  barberos,
  onVolverAlCatalogo,
  onAgendarServicio
}) {
  if (!servicio) {
    return (
      <div className="container py-5 text-center text-white">
        <h3>No se seleccionó ningún servicio</h3>
        <button className="btn btn-warning mt-3" onClick={onVolverAlCatalogo}>
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  return (
    <div className="container py-5">
      {/* Botón de retorno */}
      <button
        className="btn btn-outline-secondary btn-sm mb-4 text-light"
        onClick={onVolverAlCatalogo}
      >
        <i className="bi bi-arrow-left me-1"></i> Volver a Todos los Servicios
      </button>

      <div className="row g-5">
        {/* Columna Izquierda: Imagen principal y detalles */}
        <div className="col-lg-6">
          <div className="card bg-dark border-secondary overflow-hidden shadow-lg">
            <img
              src={servicio.imagen || 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'}
              alt={servicio.nombre}
              className="img-fluid w-100 object-fit-cover"
              style={{ maxHeight: '420px' }}
            />
            <div className="card-body bg-dark text-light p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-warning text-dark text-uppercase px-3 py-2 fw-bold">
                  {servicio.categoria || 'Servicio'}
                </span>
                <span className="text-secondary small">
                  <i className="bi bi-clock-history text-warning me-1"></i>
                  Tiempo estimado: <strong>{servicio.duracionMinutos || 30} minutos</strong>
                </span>
              </div>
              <h2 className="text-warning fw-bold">{servicio.nombre}</h2>
              <p className="lead text-secondary fs-6 mb-4">
                {servicio.descripcion}
              </p>

              {/* Lo que incluye el servicio */}
              <h5 className="text-white fw-bold mb-3 border-bottom border-secondary pb-2">
                <i className="bi bi-check2-circle text-warning me-2"></i>
                ¿Qué incluye esta experiencia?
              </h5>
              <ul className="list-unstyled text-secondary small">
                <li className="mb-2">
                  <i className="bi bi-check-lg text-warning me-2 fw-bold"></i>
                  <strong>Diagnóstico de Visagismo:</strong> Asesoría según tu tipo de rostro y crecimiento capilar.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-lg text-warning me-2 fw-bold"></i>
                  <strong>Higiene y Esterilización:</strong> Uso de toallas desechables y navaja desinfectada individual.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-lg text-warning me-2 fw-bold"></i>
                  <strong>Lavado y Masaje Capilar:</strong> Aplicación de shampoo revitalizante y acondicionador refrescante.
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-lg text-warning me-2 fw-bold"></i>
                  <strong>Peinado Final & Fijación:</strong> Acabado con cera pomade, polvos de textura o aceite hidratante.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Tarjeta de Reserva y Profesionales Recomendados */}
        <div className="col-lg-6">
          {/* Card Resumen de Contratación */}
          <div className="card bg-dark text-light border-warning p-4 shadow-lg mb-4">
            <span className="text-warning small text-uppercase fw-bold">Resumen de Tarifa</span>
            <div className="d-flex justify-content-between align-items-baseline my-2">
              <h3 className="text-white fw-bold m-0">Inversión Total:</h3>
              <span className="display-6 fw-bold text-success">
                {formatearPrecio(servicio.precio)}
              </span>
            </div>
            <p className="small text-secondary mb-4">
              * IVA incluido. Pago directo en sucursal con efectivo, débito o crédito tras finalizar la atención.
            </p>

            <div className="d-grid gap-2">
              <button
                type="button"
                className="btn btn-warning btn-lg fw-bold text-dark shadow"
                onClick={() => onAgendarServicio(servicio)}
              >
                <i className="bi bi-calendar-check-fill me-2"></i> Agendar este Servicio Ahora
              </button>
            </div>
          </div>

          {/* Barberos Recomendados para este Servicio */}
          <div className="card bg-dark text-light border-secondary p-4 shadow-sm">
            <h5 className="text-white fw-bold mb-3">
              <i className="bi bi-person-check text-warning me-2"></i>
              Especialistas Recomendados
            </h5>
            <p className="text-secondary small mb-3">
              Puedes elegir con quién atenderte durante el agendamiento:
            </p>

            <div className="list-group list-group-flush bg-transparent">
              {barberos.slice(0, 3).map(barbero => (
                <div
                  key={barbero.id}
                  className="list-group-item bg-transparent text-light border-secondary d-flex align-items-center justify-content-between px-0 py-2"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={barbero.foto}
                      alt={barbero.nombre}
                      className="rounded-circle me-3 border border-warning"
                      style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="m-0 fw-bold">{barbero.nombre}</h6>
                      <span className="small text-warning">{barbero.especialidad}</span>
                    </div>
                  </div>
                  <span className="badge bg-secondary">
                    <i className="bi bi-star-fill text-warning me-1"></i> {barbero.calificacion || 4.9}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
