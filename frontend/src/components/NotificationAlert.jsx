import React from 'react';

export default function NotificationAlert({ tipo = 'info', mensaje, onCerrar }) {
  if (!mensaje) return null;

  const clasesAlerta = {
    success: 'alert-success border-success',
    danger: 'alert-danger border-danger',
    warning: 'alert-warning border-warning',
    info: 'alert-info border-info'
  };

  const iconos = {
    success: 'bi-check-circle-fill',
    danger: 'bi-exclamation-octagon-fill',
    warning: 'bi-exclamation-triangle-fill',
    info: 'bi-info-circle-fill'
  };

  return (
    <div className={`alert ${clasesAlerta[tipo] || clasesAlerta.info} alert-dismissible fade show d-flex align-items-center shadow-sm my-3`} role="alert">
      <i className={`bi ${iconos[tipo] || iconos.info} fs-4 me-3`}></i>
      <div className="flex-grow-1">
        {mensaje}
      </div>
      {onCerrar && (
        <button
          type="button"
          className="btn-close"
          aria-label="Cerrar alerta"
          onClick={onCerrar}
        ></button>
      )}
    </div>
  );
}
