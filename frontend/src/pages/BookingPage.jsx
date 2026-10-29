import React, { useState, useEffect } from 'react';

export default function BookingPage({
  servicios,
  barberos,
  sucursales,
  promociones,
  citasExistentes,
  servicioPreseleccionado,
  barberoPreseleccionado,
  sucursalPreseleccionada,
  codigoPromoPreseleccionado,
  usuario,
  onFinalizarExito,
  onFinalizarFallo
}) {
  // Estado del paso activo (1 a 5)
  const [paso, setPaso] = useState(1);

  // Estados del formulario de agendamiento
  const [servicioId, setServicioId] = useState(servicioPreseleccionado ? servicioPreseleccionado.id : (servicios[0]?.id || 1));
  const [sucursalId, setSucursalId] = useState(sucursalPreseleccionada ? sucursalPreseleccionada.id : (sucursales[0]?.id || 1));
  const [barberoId, setBarberoId] = useState(barberoPreseleccionado ? barberoPreseleccionado.id : (barberos[0]?.id || 1));
  
  // Fecha mínima: Hoy
  const hoyStr = new Date().toISOString().split('T')[0];
  const [fecha, setFecha] = useState(hoyStr);
  const [hora, setHora] = useState('11:00');

  // Datos del cliente (prellenados si hay sesión)
  const [nombres, setNombres] = useState(usuario ? (usuario.nombres || usuario.nombre || '') : '');
  const [apellidos, setApellidos] = useState(usuario ? (usuario.apellidos || '') : '');
  const [correo, setCorreo] = useState(usuario ? (usuario.correo || '') : '');
  const [telefono, setTelefono] = useState(usuario ? (usuario.telefono || '+56 9 ') : '+56 9 ');
  const [run, setRun] = useState(usuario ? (usuario.run || '') : '');

  // Código promocional
  const [codigoPromo, setCodigoPromo] = useState(codigoPromoPreseleccionado || '');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState(0);
  const [mensajePromo, setMensajePromo] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState('');

  // Bloques de horas estándar
  const BLOQUES_HORAS = ['10:00', '11:00', '12:00', '13:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

  // Sincronizar preselecciones si cambian
  useEffect(() => {
    if (servicioPreseleccionado) setServicioId(servicioPreseleccionado.id);
  }, [servicioPreseleccionado]);

  useEffect(() => {
    if (barberoPreseleccionado) setBarberoId(barberoPreseleccionado.id);
  }, [barberoPreseleccionado]);

  useEffect(() => {
    if (sucursalPreseleccionada) setSucursalId(sucursalPreseleccionada.id);
  }, [sucursalPreseleccionada]);

  useEffect(() => {
    if (codigoPromoPreseleccionado) {
      setCodigoPromo(codigoPromoPreseleccionado);
      validarCupon(codigoPromoPreseleccionado);
    }
  }, [codigoPromoPreseleccionado]);

  // Actualizar datos del cliente si inicia sesión
  useEffect(() => {
    if (usuario) {
      if (!nombres) setNombres(usuario.nombres || usuario.nombre || '');
      if (!apellidos) setApellidos(usuario.apellidos || '');
      if (!correo) setCorreo(usuario.correo || '');
      if (!telefono || telefono === '+56 9 ') setTelefono(usuario.telefono || '+56 9 ');
      if (!run) setRun(usuario.run || '');
    }
  }, [usuario]);

  // Objetos seleccionados
  const servicioSeleccionado = servicios.find(s => String(s.id) === String(servicioId)) || servicios[0];
  const barberoSeleccionado = barberos.find(b => String(b.id) === String(barberoId)) || barberos[0];
  const sucursalSeleccionada = sucursales.find(s => String(s.id) === String(sucursalId)) || sucursales[0];

  // Cálculo de precios
  const precioBase = servicioSeleccionado ? servicioSeleccionado.precio : 15000;
  const montoDescuento = Math.round(precioBase * (descuentoPorcentaje / 100));
  const totalPagar = precioBase - montoDescuento;

  const formatearPrecio = (valor) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);
  };

  // Validar cupón de descuento
  const validarCupon = (codigo) => {
    const promo = promociones.find(p => p.codigo.trim().toUpperCase() === codigo.trim().toUpperCase() && p.activo !== false);
    if (promo) {
      setDescuentoPorcentaje(promo.descuentoPorcentaje);
      setMensajePromo(`¡Cupón válido! Se aplicó un ${promo.descuentoPorcentaje}% de descuento.`);
    } else {
      setDescuentoPorcentaje(0);
      setMensajePromo(codigo ? 'Código de descuento no válido o expirado.' : '');
    }
  };

  // Comprobar si una hora está ocupada para el barbero y fecha seleccionados
  const esHoraOcupada = (h) => {
    return citasExistentes.some(c =>
      String(c.barberoId) === String(barberoId) &&
      c.fecha === fecha &&
      c.hora && c.hora.startsWith(h) &&
      c.estado !== 'CANCELADA'
    );
  };

  // Validaciones antes de avanzar de paso
  const avanzarPaso = () => {
    setErrorValidacion('');
    if (paso === 1 && !servicioId) {
      setErrorValidacion('Debes seleccionar un servicio.');
      return;
    }
    if (paso === 2 && (!sucursalId || !barberoId)) {
      setErrorValidacion('Debes seleccionar sucursal y barbero.');
      return;
    }
    if (paso === 3) {
      if (!fecha) {
        setErrorValidacion('Por favor selecciona una fecha válida.');
        return;
      }
      if (!hora) {
        setErrorValidacion('Por favor selecciona un horario de atención.');
        return;
      }
      if (esHoraOcupada(hora)) {
        setErrorValidacion('El horario seleccionado ya se encuentra reservado. Elige otro bloque.');
        return;
      }
    }
    if (paso === 4) {
      if (!nombres.trim() || !correo.trim() || !telefono.trim()) {
        setErrorValidacion('Nombres, correo y teléfono son obligatorios.');
        return;
      }
      const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regexEmail.test(correo)) {
        setErrorValidacion('Ingresa un correo electrónico con formato válido.');
        return;
      }
    }

    setPaso(prev => prev + 1);
  };

  const retrocederPaso = () => {
    setErrorValidacion('');
    setPaso(prev => prev - 1);
  };

  // Confirmación final de la reserva
  const manejarConfirmacionFinal = async () => {
    setProcesando(true);
    setErrorValidacion('');

    try {
      const nuevaCita = {
        servicioId: Number(servicioId),
        servicioNombre: servicioSeleccionado.nombre,
        barberoId: Number(barberoId),
        barberoNombre: barberoSeleccionado.nombre,
        sucursalId: Number(sucursalId),
        sucursalNombre: sucursalSeleccionada.nombre,
        clienteId: usuario ? usuario.id : 1,
        clienteNombre: `${nombres} ${apellidos}`.trim(),
        clienteCorreo: correo,
        clienteTelefono: telefono,
        clienteRun: run,
        fecha,
        hora,
        costo: precioBase,
        descuentoAplicado: montoDescuento,
        totalFinal: totalPagar,
        codigoPromoUsado: descuentoPorcentaje > 0 ? codigoPromo : null
      };

      // Simular breve latencia de confirmación
      setTimeout(() => {
        setProcesando(false);
        // Si por alguna razón hubiera conflicto simulado
        if (fecha === '2099-01-01') {
          onFinalizarFallo('Fecha fuera de rango de atención del sistema.');
        } else {
          onFinalizarExito(nuevaCita);
        }
      }, 700);
    } catch {
      setProcesando(false);
      onFinalizarFallo('Ocurrió un error inesperado al procesar la cita. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="container py-5">
      {/* Encabezado */}
      <div className="text-center mb-4">
        <span className="text-warning text-uppercase fw-bold small">Proceso de Reserva Online</span>
        <h1 className="display-6 fw-bold text-white">AGENDA TU CITA EN 5 PASOS</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
          Selecciona tu servicio, profesional de preferencia, sucursal y fecha. Te enviaremos la confirmación inmediata.
        </p>
      </div>

      {/* Indicador visual de pasos (Stepper) */}
      <div className="card bg-dark border-secondary p-3 mb-4 shadow-sm">
        <div className="row text-center g-2">
          {[
            { num: 1, label: 'Servicio', icon: 'bi-scissors' },
            { num: 2, label: 'Sucursal y Barbero', icon: 'bi-geo-alt' },
            { num: 3, label: 'Fecha y Hora', icon: 'bi-calendar-event' },
            { num: 4, label: 'Tus Datos', icon: 'bi-person' },
            { num: 5, label: 'Confirmación', icon: 'bi-check2-circle' }
          ].map(step => (
            <div key={step.num} className="col">
              <div className={`p-2 rounded ${paso === step.num ? 'bg-warning text-dark fw-bold' : (paso > step.num ? 'bg-secondary text-white' : 'text-muted')}`}>
                <i className={`bi ${step.icon} me-1`}></i>
                <span className="d-none d-md-inline">{step.num}. {step.label}</span>
                <span className="d-inline d-md-none">{step.num}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mensaje de error si falla la validación */}
      {errorValidacion && (
        <div className="alert alert-danger d-flex align-items-center mb-4">
          <i className="bi bi-exclamation-triangle-fill fs-5 me-2"></i>
          <div>{errorValidacion}</div>
        </div>
      )}

      {/* CONTENIDO DE CADA PASO */}
      <div className="card bg-dark text-light border-secondary p-4 shadow-lg mb-4">
        {/* ============================================================== */}
        {/* PASO 1: SELECCIÓN DE SERVICIO */}
        {/* ============================================================== */}
        {paso === 1 && (
          <div>
            <h4 className="text-warning fw-bold mb-3">
              <i className="bi bi-scissors me-2"></i> Paso 1: Elige el servicio que deseas
            </h4>
            <p className="text-secondary small mb-4">
              Haz clic sobre el servicio para seleccionarlo:
            </p>

            <div className="row g-3">
              {servicios.map(serv => {
                const seleccionado = String(serv.id) === String(servicioId);
                return (
                  <div key={serv.id} className="col-md-6">
                    <div
                      className={`card h-100 p-3 cursor-pointer transition-all ${seleccionado ? 'border-warning bg-black text-warning shadow' : 'border-secondary bg-dark text-light'}`}
                      style={{ cursor: 'pointer', borderWidth: seleccionado ? '2px' : '1px' }}
                      onClick={() => setServicioId(serv.id)}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="fw-bold m-0 text-white">{serv.nombre}</h5>
                        <span className="badge bg-warning text-dark fw-bold">
                          {formatearPrecio(serv.precio)}
                        </span>
                      </div>
                      <p className="small text-secondary mb-2">{serv.descripcion}</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto small">
                        <span className="text-muted"><i className="bi bi-clock me-1"></i> {serv.duracionMinutos} min</span>
                        {seleccionado && <span className="text-warning fw-bold"><i className="bi bi-check-circle-fill me-1"></i> Seleccionado</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 2: SUCURSAL Y BARBERO */}
        {/* ============================================================== */}
        {paso === 2 && (
          <div>
            <h4 className="text-warning fw-bold mb-3">
              <i className="bi bi-geo-alt me-2"></i> Paso 2: Selecciona la sucursal y el barbero
            </h4>

            {/* Selección de Sucursal */}
            <div className="mb-4">
              <label className="form-label text-white fw-bold mb-2">
                1. ¿A qué sucursal deseas asistir?
              </label>
              <div className="row g-3">
                {sucursales.map(suc => {
                  const sel = String(suc.id) === String(sucursalId);
                  return (
                    <div key={suc.id} className="col-md-4">
                      <div
                        className={`card h-100 p-3 text-center cursor-pointer ${sel ? 'border-warning bg-black shadow' : 'border-secondary bg-dark'}`}
                        style={{ cursor: 'pointer', borderWidth: sel ? '2px' : '1px' }}
                        onClick={() => setSucursalId(suc.id)}
                      >
                        <h6 className="fw-bold text-white mb-1">{suc.nombre}</h6>
                        <p className="small text-secondary mb-1">{suc.direccion}</p>
                        <span className="small text-warning">{suc.telefono}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selección de Barbero */}
            <div>
              <label className="form-label text-white fw-bold mb-2">
                2. ¿Con qué barbero te gustaría atenderte?
              </label>
              <div className="row g-3">
                {barberos.map(barb => {
                  const sel = String(barb.id) === String(barberoId);
                  return (
                    <div key={barb.id} className="col-md-4">
                      <div
                        className={`card h-100 p-3 text-center cursor-pointer ${sel ? 'border-warning bg-black shadow' : 'border-secondary bg-dark'}`}
                        style={{ cursor: 'pointer', borderWidth: sel ? '2px' : '1px' }}
                        onClick={() => setBarberoId(barb.id)}
                      >
                        <img
                          src={barb.foto}
                          alt={barb.nombre}
                          className="rounded-circle mx-auto mb-2 border border-warning"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <h6 className="fw-bold text-white mb-1">{barb.nombre}</h6>
                        <span className="small text-info d-block mb-1">{barb.especialidad}</span>
                        <span className="small text-warning">
                          <i className="bi bi-star-fill me-1"></i> {barb.calificacion || 4.9}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 3: FECHA Y HORA (Con validación de ocupación) */}
        {/* ============================================================== */}
        {paso === 3 && (
          <div>
            <h4 className="text-warning fw-bold mb-3">
              <i className="bi bi-calendar-event me-2"></i> Paso 3: Elige fecha y hora de tu atención
            </h4>
            <p className="text-secondary small mb-4">
              Atendiendo con <strong>{barberoSeleccionado.nombre}</strong> en <strong>{sucursalSeleccionada.nombre}</strong>.
            </p>

            <div className="row g-4">
              {/* Selector de fecha */}
              <div className="col-md-5">
                <label className="form-label text-white fw-bold">Fecha de la Cita:</label>
                <input
                  type="date"
                  className="form-control form-control-lg bg-dark text-light border-warning"
                  min={hoyStr}
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
                <small className="text-secondary mt-1 d-block">
                  Atendemos de Lunes a Sábado. Domingos cerrado.
                </small>
              </div>

              {/* Selector de Bloques de Hora */}
              <div className="col-md-7">
                <label className="form-label text-white fw-bold">Bloques Horarios Disponibles:</label>
                <div className="row g-2">
                  {BLOQUES_HORAS.map(bloque => {
                    const ocupado = esHoraOcupada(bloque);
                    const seleccionado = hora === bloque;

                    return (
                      <div key={bloque} className="col-4">
                        <button
                          type="button"
                          disabled={ocupado}
                          className={`btn w-100 py-2 btn-sm fw-bold ${ocupado ? 'btn-outline-secondary text-muted text-decoration-line-through' : (seleccionado ? 'btn-warning text-dark' : 'btn-outline-warning text-light')}`}
                          onClick={() => setHora(bloque)}
                        >
                          <i className="bi bi-clock me-1"></i>
                          {bloque}
                          {ocupado && <span className="d-block text-danger small">Ocupado</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 4: DATOS DEL CLIENTE Y CUPÓN */}
        {/* ============================================================== */}
        {paso === 4 && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-warning fw-bold m-0">
                <i className="bi bi-person-lines-fill me-2"></i> Paso 4: Datos de contacto y descuentos
              </h4>
              {usuario && (
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i> Datos cargados de tu cuenta
                </span>
              )}
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label text-light small fw-bold">Nombres *</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Ej: Juan"
                  value={nombres}
                  onChange={(e) => setNombres(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small fw-bold">Apellidos</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Ej: Pérez González"
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label text-light small fw-bold">Correo Electrónico *</label>
                <input
                  type="email"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="ejemplo@correo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label text-light small fw-bold">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="+56 9 1234 5678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label text-light small fw-bold">RUT / RUN</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="12.345.678-9"
                  value={run}
                  onChange={(e) => setRun(e.target.value)}
                />
              </div>

              {/* Cupón Promocional */}
              <div className="col-12 mt-4 pt-3 border-top border-secondary">
                <label className="form-label text-warning fw-bold">
                  <i className="bi bi-tag me-1"></i> ¿Tienes un código de promoción?
                </label>
                <div className="input-group" style={{ maxWidth: '400px' }}>
                  <input
                    type="text"
                    className="form-control bg-dark text-light border-secondary text-uppercase"
                    placeholder="Ej: PRIMERA-VEZ"
                    value={codigoPromo}
                    onChange={(e) => setCodigoPromo(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-warning"
                    type="button"
                    onClick={() => validarCupon(codigoPromo)}
                  >
                    Aplicar
                  </button>
                </div>
                {mensajePromo && (
                  <small className={`d-block mt-2 ${descuentoPorcentaje > 0 ? 'text-success fw-bold' : 'text-danger'}`}>
                    {mensajePromo}
                  </small>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PASO 5: RESUMEN FINAL Y CONFIRMACIÓN */}
        {/* ============================================================== */}
        {paso === 5 && (
          <div>
            <h4 className="text-warning fw-bold mb-3">
              <i className="bi bi-receipt me-2"></i> Paso 5: Revisa y confirma tu reserva
            </h4>
            <p className="text-secondary small mb-4">
              Verifica que todos los datos sean correctos antes de confirmar tu hora:
            </p>

            <div className="row g-4">
              {/* Desglose de Cita */}
              <div className="col-md-7">
                <div className="p-3 bg-black rounded border border-secondary">
                  <h5 className="text-white fw-bold mb-3 border-bottom border-secondary pb-2">
                    Detalles de la Cita
                  </h5>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Servicio:</span>
                    <strong className="col-7 text-white">{servicioSeleccionado.nombre}</strong>
                  </div>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Duración:</span>
                    <span className="col-7 text-white">{servicioSeleccionado.duracionMinutos} minutos</span>
                  </div>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Barbero asignado:</span>
                    <span className="col-7 text-warning fw-bold">{barberoSeleccionado.nombre}</span>
                  </div>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Sucursal:</span>
                    <span className="col-7 text-white">{sucursalSeleccionada.nombre} ({sucursalSeleccionada.direccion})</span>
                  </div>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Fecha y Hora:</span>
                    <strong className="col-7 text-info">{fecha} a las {hora} hrs</strong>
                  </div>
                  <div className="row mb-2">
                    <span className="col-5 text-secondary">Cliente:</span>
                    <span className="col-7 text-white">{nombres} {apellidos} ({correo})</span>
                  </div>
                </div>
              </div>

              {/* Desglose Económico */}
              <div className="col-md-5">
                <div className="p-3 bg-black rounded border border-warning">
                  <h5 className="text-warning fw-bold mb-3 border-bottom border-secondary pb-2">
                    Resumen de Pago
                  </h5>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-secondary">Subtotal Servicio:</span>
                    <span className="text-white">{formatearPrecio(precioBase)}</span>
                  </div>
                  {descuentoPorcentaje > 0 && (
                    <div className="d-flex justify-content-between mb-2 text-success">
                      <span>Descuento ({descuentoPorcentaje}%):</span>
                      <span>-{formatearPrecio(montoDescuento)}</span>
                    </div>
                  )}
                  <hr className="border-secondary my-2" />
                  <div className="d-flex justify-content-between align-items-baseline mb-3">
                    <strong className="fs-5 text-white">Total a Pagar:</strong>
                    <span className="fs-4 fw-bold text-success">{formatearPrecio(totalPagar)}</span>
                  </div>
                  <p className="small text-secondary mb-0">
                    <i className="bi bi-info-circle me-1"></i> El pago se realiza presencialmente en la sucursal al concluir el servicio (Efectivo, Débito o Crédito).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BOTONES DE NAVEGACIÓN DEL WIZARD */}
        <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
          {paso > 1 ? (
            <button
              type="button"
              className="btn btn-outline-secondary text-light"
              onClick={retrocederPaso}
              disabled={procesando}
            >
              <i className="bi bi-arrow-left me-1"></i> Paso Anterior
            </button>
          ) : (
            <div></div>
          )}

          {paso < 5 ? (
            <button
              type="button"
              className="btn btn-warning text-dark fw-bold px-4 shadow"
              onClick={avanzarPaso}
            >
              Continuar al Paso {paso + 1} <i className="bi bi-arrow-right ms-1"></i>
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-success btn-lg fw-bold px-4 shadow"
              disabled={procesando}
              onClick={manejarConfirmacionFinal}
            >
              {procesando ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Confirmando Cita...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle-fill me-2"></i>
                  Confirmar y Reservar Cita
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
