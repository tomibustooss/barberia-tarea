import React from 'react';

export default function BookingSuccessPage({
  cita,
  onVerMisCitas,
  onVolverInicio
}) {
  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor || 0);
  };

  return (
    <div className="container py-5 text-light">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card bg-dark border-success border-2 shadow-lg p-4 text-center">
            {/* Ícono de éxito */}
            <div className="mb-3">
              <span className="badge bg-success rounded-circle p-3 shadow">
                <i className="bi bi-check-lg display-4 text-white"></i>
              </span>
            </div>

            <span className="badge bg-success text-white px-3 py-2 fw-bold text-uppercase mx-auto mb-2">
              ¡Reserva Confirmada con Éxito!
            </span>
            <h2 className="fw-bold text-white mb-2">¡TE ESPERAMOS EN BARBERÍA NORTE!</h2>
            <p className="text-secondary small mb-4">
              Hemos registrado tu cita en el sistema y enviado el comprobante a tu correo electrónico.
            </p>

            {/* Comprobante / Voucher de Cita */}
            <div className="card bg-black border-secondary p-4 text-start mb-4">
              <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
                <div>
                  <span className="text-secondary small">CÓDIGO DE RESERVA:</span>
                  <h4 className="text-warning fw-bold font-monospace m-0">
                    {cita.codigoReserva || 'CIT-1099'}
                  </h4>
                </div>
                <div className="text-end">
                  <span className="badge bg-success text-uppercase">Estado: {cita.estado || 'CONFIRMADA'}</span>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <span className="text-secondary small d-block">Servicio Reservado:</span>
                  <strong className="text-white fs-6">{cita.servicioNombre}</strong>
                </div>

                <div className="col-md-6">
                  <span className="text-secondary small d-block">Barbero Asignado:</span>
                  <strong className="text-warning fs-6">{cita.barberoNombre}</strong>
                </div>

                <div className="col-md-6">
                  <span className="text-secondary small d-block">Sucursal de Atención:</span>
                  <span className="text-white">{cita.sucursalNombre}</span>
                </div>

                <div className="col-md-6">
                  <span className="text-secondary small d-block">Fecha y Hora Programada:</span>
                  <strong className="text-info fs-6">
                    <i className="bi bi-calendar-check me-1"></i>
                    {cita.fecha} a las {cita.hora} hrs
                  </strong>
                </div>

                <div className="col-md-6">
                  <span className="text-secondary small d-block">Nombre del Cliente:</span>
                  <span className="text-white">{cita.clienteNombre}</span>
                </div>

                <div className="col-md-6">
                  <span className="text-secondary small d-block">Total a Cancelar en Sucursal:</span>
                  <strong className="text-success fs-5">
                    {formatearPrecio(cita.totalFinal)}
                  </strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top border-secondary small text-secondary">
                <i className="bi bi-info-circle text-warning me-2"></i>
                Por favor preséntate 5 a 10 minutos antes de la hora fijada. Si necesitas reagendar o cancelar, puedes hacerlo desde tu portal de cliente con al menos 2 horas de anticipación.
              </div>
            </div>

            {/* Acciones */}
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button
                type="button"
                className="btn btn-warning text-dark fw-bold px-4 shadow"
                onClick={onVerMisCitas}
              >
                <i className="bi bi-calendar3 me-2"></i> Ver Mis Citas
              </button>
              <button
                type="button"
                className="btn btn-outline-light px-4"
                onClick={onVolverInicio}
              >
                <i className="bi bi-house-door me-2"></i> Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
