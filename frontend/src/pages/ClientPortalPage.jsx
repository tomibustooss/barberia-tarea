import React, { useState } from 'react';

export default function ClientPortalPage({
  usuario,
  citas,
  onCancelarCita,
  onAgendarNueva
}) {
  const [filtroEstado, setFiltroEstado] = useState('TODAS');
  const [mensajeCancelacion, setMensajeCancelacion] = useState('');

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor || 0);
  };

  // Filtrar citas del usuario autenticado
  const citasUsuario = citas.filter(c => {
    if (!usuario) return true;
    return String(c.clienteId) === String(usuario.id) || c.clienteCorreo === usuario.correo;
  });

  const citasFiltradas = citasUsuario.filter(c => {
    if (filtroEstado === 'TODAS') return true;
    return c.estado === filtroEstado;
  });

  const manejarCancelar = (citaId) => {
    if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      onCancelarCita(citaId);
      setMensajeCancelacion('Tu cita ha sido cancelada correctamente.');
      setTimeout(() => setMensajeCancelacion(''), 4000);
    }
  };

  return (
    <div className="container py-5 text-light">
      {/* Encabezado del perfil */}
      <div className="card bg-dark border-secondary p-4 mb-4 shadow-sm">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-warning text-dark fw-bold d-flex align-items-center justify-content-center me-3 fs-3"
              style={{ width: '60px', height: '60px' }}>
              <i className="bi bi-person"></i>
            </div>
            <div>
              <span className="badge bg-secondary text-uppercase small mb-1">Área Privada de Cliente</span>
              <h3 className="fw-bold text-white m-0">
                {usuario ? `${usuario.nombres || usuario.nombre} ${usuario.apellidos || ''}` : 'Cliente Barbería Norte'}
              </h3>
              <p className="text-secondary small m-0">
                <i className="bi bi-envelope me-1"></i> {usuario ? usuario.correo : 'cliente@barberianorte.cl'}
                {usuario?.telefono && <span className="ms-3"><i className="bi bi-telephone me-1"></i> {usuario.telefono}</span>}
              </p>
            </div>
          </div>

          <button
            className="btn btn-warning btn-sm fw-bold text-dark"
            onClick={onAgendarNueva}
          >
            <i className="bi bi-calendar-plus me-1"></i> Agendar Nueva Cita
          </button>
        </div>
      </div>

      {mensajeCancelacion && (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
          <i className="bi bi-info-circle-fill me-2"></i>
          {mensajeCancelacion}
          <button type="button" className="btn-close" onClick={() => setMensajeCancelacion('')}></button>
        </div>
      )}

      {/* Tabs / Filtros de Citas */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h4 className="fw-bold text-white m-0">
          <i className="bi bi-calendar3 text-warning me-2"></i>
          Mis Reservas y Citas ({citasFiltradas.length})
        </h4>

        <div className="btn-group btn-group-sm" role="group">
          {['TODAS', 'CONFIRMADA', 'PENDIENTE', 'CANCELADA'].map(est => (
            <button
              key={est}
              type="button"
              className={`btn ${filtroEstado === est ? 'btn-warning text-dark fw-bold' : 'btn-outline-secondary text-light'}`}
              onClick={() => setFiltroEstado(est)}
            >
              {est}
            </button>
          ))}
        </div>
      </div>

      {/* Listado de citas */}
      {citasFiltradas.length > 0 ? (
        <div className="row g-3">
          {citasFiltradas.map(c => {
            const puedeCancelar = c.estado === 'PENDIENTE' || c.estado === 'CONFIRMADA';

            return (
              <div key={c.id} className="col-12">
                <div className="card bg-dark border-secondary p-3 shadow-sm hover-shadow">
                  <div className="row align-items-center g-3">
                    {/* Código y Estado */}
                    <div className="col-md-2 text-md-center">
                      <span className="font-monospace fw-bold text-warning d-block">
                        {c.codigoReserva || `CIT-${c.id}`}
                      </span>
                      <span className={`badge ${c.estado === 'CONFIRMADA' ? 'bg-success' : (c.estado === 'CANCELADA' ? 'bg-danger' : 'bg-warning text-dark')} text-uppercase small`}>
                        {c.estado}
                      </span>
                    </div>

                    {/* Detalle Servicio y Barbero */}
                    <div className="col-md-4">
                      <h5 className="fw-bold text-white mb-1">{c.servicioNombre}</h5>
                      <span className="small text-secondary d-block">
                        <i className="bi bi-person-badge text-warning me-1"></i> Barbero: <strong>{c.barberoNombre}</strong>
                      </span>
                      <span className="small text-secondary d-block">
                        <i className="bi bi-geo-alt text-warning me-1"></i> {c.sucursalNombre}
                      </span>
                    </div>

                    {/* Fecha y Hora */}
                    <div className="col-md-3">
                      <strong className="text-info d-block">
                        <i className="bi bi-calendar-event me-1"></i> {c.fecha}
                      </strong>
                      <span className="text-white small">
                        <i className="bi bi-clock me-1"></i> {c.hora} hrs
                      </span>
                      <span className="text-secondary small d-block">
                        Total: <strong className="text-success">{formatearPrecio(c.totalFinal || c.costo)}</strong>
                      </span>
                    </div>

                    {/* Acciones */}
                    <div className="col-md-3 text-md-end">
                      {puedeCancelar ? (
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => manejarCancelar(c.id)}
                        >
                          <i className="bi bi-x-circle me-1"></i> Cancelar Cita
                        </button>
                      ) : (
                        <span className="text-muted small">Sin acciones disponibles</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-5 bg-dark border border-secondary rounded">
          <i className="bi bi-calendar-x text-warning fs-1 mb-3 d-block"></i>
          <h5 className="text-white">No tienes citas registradas en este estado</h5>
          <p className="text-secondary small">
            Agenda tu próxima hora para corte de cabello o perfilado de barba en pocos clics.
          </p>
          <button
            className="btn btn-warning btn-sm text-dark fw-bold mt-2"
            onClick={onAgendarNueva}
          >
            <i className="bi bi-calendar-plus me-1"></i> Agendar Cita Ahora
          </button>
        </div>
      )}
    </div>
  );
}
